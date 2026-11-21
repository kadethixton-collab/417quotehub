import type { SVGProps } from "react";

const paths = {
  home: "M3 10.5 12 3l9 7.5M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5",
  wrench: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z",
  storm: "M7 16a4 4 0 0 1-.9-7.9 6 6 0 0 1 11.6 1.1A3.5 3.5 0 0 1 17.5 16M13 12l-3 5h4l-3 5",
  droplet: "M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 5 5",
  plus: "M12 5v14M5 12h14",
  flame: "M12 22a7 7 0 0 0 7-7c0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-5 5-5 8a7 7 0 0 0 7 7Z",
  snowflake: "M12 2v20M4.9 4.9l14.2 14.2M2 12h20M4.9 19.1 19.1 4.9",
  fan: "M12 12c0-4 1-8 4-8s3 4-4 8Zm0 0c4 0 8 1 8 4s-4 3-8-4Zm0 0c0 4-1 8-4 8s-3-4 4-8Zm0 0c-4 0-8-1-8-4s4-3 8 4Z",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  hammer: "m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9m3-6 6 6-3 3-6-6 3-3Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  pin: "M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0",
  check: "m5 12 5 5L20 7",
  shield: "M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6l-8-3Zm-3 9 2 2 4-4",
  phoneOff: "m3 3 18 18M8.6 8.6A16 16 0 0 0 15.4 15.4l1.8-1.8a1 1 0 0 1 1-.2l3 1a1 1 0 0 1 .7 1V19a2 2 0 0 1-2.2 2A18 18 0 0 1 3 4.2 2 2 0 0 1 5 2h3.5a1 1 0 0 1 1 .7l1 3a1 1 0 0 1-.2 1Z",
  dollar: "M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  x: "M6 6l12 12M18 6 6 18",
  arrowRight: "M5 12h14m-6-6 6 6-6 6",
  arrowLeft: "M19 12H5m6-6-6 6 6 6",
  clipboard: "M9 4h6v3H9zM7 5H5v16h14V5h-2M8 12h8M8 16h5",
  users: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 10a7 7 0 0 1 14 0m1-10a3 3 0 1 0 0-6m5 16a6 6 0 0 0-4-5.7",
  scale: "M12 3v18M5 21h14M6 7h12M6 7l-3 7a3 3 0 0 0 6 0L6 7Zm12 0-3 7a3 3 0 0 0 6 0l-3-7Z",
  star: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "h-6 w-6", ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
