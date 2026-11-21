/**
 * Trade-agnostic local facts for each city in the service area.
 * Trade-specific copy for a city lives in trades.ts (`cityContent`), and falls back
 * to templates built from these facts when a trade hasn't written custom copy yet.
 */
/**
 * Territories are the "rentable" areas. Contractor seats are sold per trade, per territory,
 * and leads are routed to the partners who hold a seat in the homeowner's territory.
 */
export type Territory = { slug: string; name: string };

export const territories: Territory[] = [
  { slug: "springfield", name: "Springfield" },
  { slug: "christian-county", name: "Nixa & Ozark" },
  { slug: "sw-greene", name: "Republic & Battlefield" },
  { slug: "north-greene", name: "Willard" },
  { slug: "east-417", name: "Rogersville" },
];

export type City = {
  slug: string;
  name: string;
  /** Territory slug (see `territories` above). */
  territory: string;
  county: string;
  zips: string[];
  /** Neighborhoods, subdivisions, and corridors locals will recognize. */
  neighborhoods: string[];
  landmarks: string[];
  /** Who homeowners check with about permits / codes. */
  permitAuthority: string;
  /** One-sentence character of the local housing stock. */
  housingNote: string;
  /** Short trade-agnostic description used on cards and fallbacks. */
  blurb: string;
  geo: { lat: number; lng: number };
};

export const cities: City[] = [
  {
    slug: "springfield-mo",
    name: "Springfield",
    territory: "springfield",
    county: "Greene County",
    zips: ["65802", "65803", "65804", "65806", "65807", "65809", "65810"],
    neighborhoods: [
      "Rountree",
      "Phelps Grove",
      "Midtown",
      "Galloway Village",
      "Southern Hills",
      "Seminole-Holland",
      "Commercial Street (C-Street)",
      "Delaware",
    ],
    landmarks: [
      "Missouri State University",
      "Bass Pro Shops Outdoor World",
      "Park Central Square",
      "Nathanael Greene Park",
      "Battlefield Mall",
    ],
    permitAuthority: "the City of Springfield's Building Development Services",
    housingNote:
      "a mix of 1920s–1950s bungalows and Tudors near Missouri State, mid-century ranches across the north and west sides, and newer builds out past Battlefield Road",
    blurb: "The Queen City of the Ozarks — from historic Midtown bungalows to new southside builds.",
    geo: { lat: 37.209, lng: -93.2923 },
  },
  {
    slug: "nixa-mo",
    name: "Nixa",
    territory: "christian-county",
    county: "Christian County",
    zips: ["65714"],
    neighborhoods: [
      "the Tracker Road corridor",
      "Downtown Nixa along Main Street",
      "the Highway 160 & 14 area",
      "neighborhoods off Northview Road",
      "the Gregg Road area",
    ],
    landmarks: ["McCauley Park", "Nixa Community Center", "Nixa High School", "the Sucker Day festival grounds"],
    permitAuthority: "the City of Nixa's Planning & Development department",
    housingNote:
      "a fast-growing mix of 1990s–2020s subdivision homes, many with HOA covenants, plus older homes near downtown",
    blurb: "One of the fastest-growing towns in the Ozarks, packed with newer subdivisions.",
    geo: { lat: 37.0434, lng: -93.2944 },
  },
  {
    slug: "ozark-mo",
    name: "Ozark",
    territory: "christian-county",
    county: "Christian County",
    zips: ["65721"],
    neighborhoods: [
      "the Historic Ozark Square",
      "neighborhoods along the Finley River",
      "the Highway 65 & CC corridor",
      "the J Highway area",
      "subdivisions off North 3rd Street",
    ],
    landmarks: ["Finley River Park", "the Ozark Mill at Finley Farms", "the Christian County Courthouse", "the OC (Ozark Community Center)"],
    permitAuthority: "the City of Ozark's Building Department",
    housingNote:
      "historic homes around the square, wooded lots near the Finley River, and plenty of 2000s-era subdivisions east of Highway 65",
    blurb: "The Christian County seat, where historic charm meets new development along the Finley.",
    geo: { lat: 37.0209, lng: -93.206 },
  },
  {
    slug: "republic-mo",
    name: "Republic",
    territory: "sw-greene",
    county: "Greene County",
    zips: ["65738"],
    neighborhoods: [
      "the Highway 60 corridor",
      "the Highway 174 area",
      "neighborhoods near Republic High School",
      "newer subdivisions on the north side",
      "older blocks near downtown on Main Avenue",
    ],
    landmarks: ["Wilson's Creek National Battlefield", "Republic Tigers athletics complex", "US-60", "Republic Community Center"],
    permitAuthority: "the City of Republic's Building & Development office",
    housingNote:
      "a booming stock of 2000s–2020s single-family homes with older ranch houses near downtown, many on open, wind-exposed lots",
    blurb: "A fast-growing Greene County city just minutes from Wilson's Creek National Battlefield.",
    geo: { lat: 37.12, lng: -93.4802 },
  },
  {
    slug: "willard-mo",
    name: "Willard",
    territory: "north-greene",
    county: "Greene County",
    zips: ["65781"],
    neighborhoods: [
      "the Highway 160 corridor",
      "the Highway AB area",
      "neighborhoods near Willard schools",
      "acreage properties toward Walnut Grove",
    ],
    landmarks: ["the Frisco Highline Trail trailhead", "Springfield-Branson National Airport (nearby)", "Willard High School", "Jackson Street Park"],
    permitAuthority: "the City of Willard (or Greene County for properties outside city limits)",
    housingNote:
      "small-town ranch homes, newer subdivisions, and rural acreage with outbuildings, barns, and shops",
    blurb: "A small-town feel northwest of Springfield, home to the Frisco Highline Trail.",
    geo: { lat: 37.305, lng: -93.4285 },
  },
  {
    slug: "battlefield-mo",
    name: "Battlefield",
    territory: "sw-greene",
    county: "Greene County",
    zips: ["65619"],
    neighborhoods: [
      "neighborhoods along Weaver Road",
      "the Highway FF corridor",
      "subdivisions near Republic Road",
      "established streets near Battlefield City Park",
    ],
    landmarks: ["Wilson's Creek National Battlefield (just west)", "Battlefield City Park", "Highway FF", "Weaver Road"],
    permitAuthority: "the City of Battlefield's city hall",
    housingNote:
      "established 1970s–1990s ranch and split-level homes, many with mature trees, plus a handful of newer infill builds",
    blurb: "A quiet, tree-lined community on Springfield's southwest edge.",
    geo: { lat: 37.1156, lng: -93.3702 },
  },
  {
    slug: "rogersville-mo",
    name: "Rogersville",
    territory: "east-417",
    county: "Webster & Greene Counties",
    zips: ["65742"],
    neighborhoods: [
      "the US-60 corridor",
      "the Highway 125 area",
      "neighborhoods near Logan-Rogersville schools",
      "rural acreage toward Fordland",
    ],
    landmarks: ["Logan-Rogersville High School", "US-60 east of Springfield", "Highway 125", "the James River headwaters area"],
    permitAuthority: "the City of Rogersville (or Webster County for properties outside city limits)",
    housingNote:
      "a mix of newer subdivisions along US-60 and rural homes on acreage with detached garages, barns, and shops",
    blurb: "A growing community east of Springfield with room to spread out.",
    geo: { lat: 37.1173, lng: -93.0557 },
  },
];

export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
export const territoryBySlug = (slug: string) => territories.find((t) => t.slug === slug);
export const citiesInTerritory = (slug: string) => cities.filter((c) => c.territory === slug);
