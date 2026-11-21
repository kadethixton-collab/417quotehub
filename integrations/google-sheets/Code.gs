/**
 * 417 Quote Hub — Lead Log, Partner Emails & Monthly Report (Google Apps Script)
 * ─────────────────────────────────────────────────────────────────────────────
 * What it does, for free, every time the website receives a request:
 *   • Logs every homeowner lead to the "Leads" tab
 *   • Emails each matched partner the lead instantly (speed-to-lead wins jobs)
 *   • Emails you a copy, flagged when a lead had no partner and needs manual routing
 *   • Logs one row per partner per lead to "Partner Leads" (used for retainer reporting)
 *   • Keeps a live "Monthly Report": leads per partner per month + unmatched leads by territory
 *   • Logs contractor applications to "Partner Applications" and emails you
 *
 * SETUP (about 5 minutes) — full steps are in the README under "Google Sheet lead log":
 *   1. Create a new Google Sheet → Extensions → Apps Script → paste this file → Save.
 *   2. Edit CONFIG below.
 *   3. Run the `setup` function once (authorize when asked).
 *   4. Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone → Deploy.
 *   5. Copy the Web app URL into LEAD_WEBHOOK_URL on Vercel (add ?key=YOUR_SECRET if you set one).
 */

const CONFIG = {
  /** Where new-lead and new-application alerts go. Set to "" to turn off owner emails. */
  OWNER_EMAIL: "quotes@417quotehub.com",
  /** Email each matched partner the full lead the moment it arrives. */
  EMAIL_PARTNERS: true,
  /** Optional shared secret. If set, the webhook URL must end in ?key=THIS_VALUE. */
  SHARED_SECRET: "",
  BRAND: "417 Quote Hub",
};

const TABS = {
  leads: {
    name: "Leads",
    headers: ["Submitted", "Lead ID", "Trade", "Project", "Timeline", "City", "ZIP", "Territory", "Name", "Phone", "Email", "Note", "Photos", "Routing", "Matched Partners", "Source Page", "Outcome", "Your Notes"],
  },
  partnerLeads: {
    name: "Partner Leads",
    headers: ["Month", "Partner", "Partner ID", "Territory", "City", "Project", "Lead ID", "Submitted"],
  },
  report: { name: "Monthly Report" },
  applications: {
    name: "Partner Applications",
    headers: ["Submitted", "Company", "Contact", "Phone", "Email", "Trade", "Cities", "Territories (seats open)", "Seat Status", "Years in Business", "Website", "Insured", "Message"],
  },
};

/* ───────────────────────────── Webhook entry point ───────────────────────────── */

function doPost(e) {
  try {
    if (CONFIG.SHARED_SECRET && String((e.parameter && e.parameter.key) || "") !== CONFIG.SHARED_SECRET) {
      return json_({ ok: false, error: "unauthorized" });
    }
    const data = JSON.parse(e.postData.contents);
    // Copies sent to an individual partner's own webhook carry `deliveredTo`; don't double-log them.
    if (data.deliveredTo) return json_({ ok: true, skipped: "partner copy" });

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      ensureSheets_();
      if (data.type === "homeowner_lead") handleLead_(data);
      else if (data.type === "partner_application") handleApplication_(data);
      else return json_({ ok: false, error: "unknown type" });
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err) });
  }
}

/** Run once from the Apps Script editor to create the tabs and authorize email. */
function setup() {
  ensureSheets_();
  if (CONFIG.OWNER_EMAIL) MailApp.getRemainingDailyQuota(); // triggers the email permission prompt
}

/* ───────────────────────────────── Handlers ───────────────────────────────── */

function handleLead_(d) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const when = new Date(d.submittedAt || Date.now());
  const partners = d.matchedPartners || [];
  const territory = d.territoryName || d.territory || "(none)";

  ss.getSheetByName(TABS.leads.name).appendRow([
    when, d.leadId, d.tradeName, d.projectTypeLabel, d.timelineLabel, d.city, d.zip, territory,
    d.fullName, fmtPhone_(d.phone), d.email, d.note || "", (d.photos || []).join("\n"),
    d.routing || "", partners.map(function (p) { return p.company; }).join(", "), d.sourcePage || "", "", "",
  ]);

  const month = Utilities.formatDate(when, ss.getSpreadsheetTimeZone(), "yyyy-MM");
  const pl = ss.getSheetByName(TABS.partnerLeads.name);
  partners.forEach(function (p) {
    pl.appendRow([month, p.company, p.id, territory, d.city, d.projectTypeLabel, d.leadId, when]);
  });

  if (CONFIG.EMAIL_PARTNERS) {
    partners.forEach(function (p) {
      if (!p.email) return;
      MailApp.sendEmail({
        to: p.email,
        replyTo: d.email,
        name: CONFIG.BRAND,
        subject: "New lead: " + d.projectTypeLabel + " in " + d.city + " (" + d.timelineLabel + ")",
        body: leadText_(d, partners.length) +
          "\n\nYou're one of " + partners.length + " local pro" + (partners.length === 1 ? "" : "s") +
          " on this request. The first to call usually wins the job, so please reach out within the hour.\n\n— " + CONFIG.BRAND,
      });
    });
  }

  if (CONFIG.OWNER_EMAIL) {
    const manual = !partners.length;
    MailApp.sendEmail({
      to: CONFIG.OWNER_EMAIL,
      name: CONFIG.BRAND,
      subject: (manual ? "⚠ UNMATCHED lead (" + territory + "): " : "New lead: ") + d.projectTypeLabel + " in " + d.city,
      body: (manual
        ? "No active partner holds a seat in " + territory + " for " + d.tradeName + ". Route this one manually, or use it to sell that seat.\n\n"
        : "Sent to: " + partners.map(function (p) { return p.company; }).join(", ") + "\n\n") + leadText_(d, partners.length),
    });
  }
}

function handleApplication_(d) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const terr = (d.territories || []).map(function (t) { return t.name + " (" + t.seatsOpen + " open)"; }).join(", ");
  ss.getSheetByName(TABS.applications.name).appendRow([
    new Date(d.submittedAt || Date.now()), d.companyName, d.contactName, fmtPhone_(d.phone), d.email, d.tradeName,
    (d.serviceCities || []).join(", "), terr, d.seatStatus, d.yearsInBusiness, d.website || "", d.insured ? "Yes" : "No", d.message || "",
  ]);
  if (CONFIG.OWNER_EMAIL) {
    MailApp.sendEmail({
      to: CONFIG.OWNER_EMAIL,
      replyTo: d.email,
      name: CONFIG.BRAND,
      subject: "New partner application: " + d.companyName + " (" + d.tradeName + ", " + d.seatStatus + ")",
      body: "Company: " + d.companyName + "\nContact: " + d.contactName + "\nPhone: " + fmtPhone_(d.phone) + "\nEmail: " + d.email +
        "\nTrade: " + d.tradeName + "\nCities: " + (d.serviceCities || []).join(", ") + "\nTerritories: " + terr +
        "\nYears in business: " + d.yearsInBusiness + "\nWebsite: " + (d.website || "—") + "\n\n" + (d.message || ""),
    });
  }
}

/* ───────────────────────────────── Helpers ───────────────────────────────── */

function leadText_(d) {
  return [
    "Project:  " + d.projectTypeLabel + " (" + d.tradeName + ")",
    "Timeline: " + d.timelineLabel,
    "Location: " + d.city + ", MO " + d.zip,
    "",
    "Name:  " + d.fullName,
    "Phone: " + fmtPhone_(d.phone),
    "Email: " + d.email,
    d.note ? "\nNotes: " + d.note : null,
    (d.photos && d.photos.length) ? "\nPhotos:\n" + d.photos.join("\n") : null,
    "\nLead ID: " + d.leadId,
  ].filter(function (line) { return line !== null; }).join("\n");
}

function fmtPhone_(p) {
  const s = String(p || "").replace(/\D/g, "");
  return s.length === 10 ? "(" + s.slice(0, 3) + ") " + s.slice(3, 6) + "-" + s.slice(6) : String(p || "");
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function ensureSheets_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  [TABS.leads, TABS.partnerLeads, TABS.applications].forEach(function (t) {
    let sh = ss.getSheetByName(t.name);
    if (!sh) sh = ss.insertSheet(t.name);
    if (sh.getLastRow() === 0) {
      sh.appendRow(t.headers);
      sh.getRange(1, 1, 1, t.headers.length).setFontWeight("bold");
      sh.setFrozenRows(1);
    }
  });

  let rep = ss.getSheetByName(TABS.report.name);
  if (!rep) {
    rep = ss.insertSheet(TABS.report.name);
    rep.getRange("A1").setValue("Leads per partner per month (send each partner their row with the monthly invoice)").setFontWeight("bold");
    rep.getRange("A2").setFormula(
      "=IFERROR(QUERY('Partner Leads'!A:C,\"select B, count(C) where B is not null group by B pivot A\",1),\"No partner leads yet\")"
    );
    rep.getRange("A20").setValue("Unmatched leads by territory (demand for seats you haven't sold)").setFontWeight("bold");
    rep.getRange("A21").setFormula(
      "=IFERROR(QUERY(Leads!A:N,\"select H, count(B) where N = 'manual' group by H label count(B) 'Unmatched leads'\",1),\"None yet\")"
    );
  }
  const def = ss.getSheetByName("Sheet1");
  if (def && ss.getSheets().length > 1 && def.getLastRow() === 0) ss.deleteSheet(def);
}
