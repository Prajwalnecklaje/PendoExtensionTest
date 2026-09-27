const paths = {
  arrowRight: <path d="m9 18 6-6-6-6M3 12h12" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  bell: <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />,
  book: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />,
  calendar: <><path d="M8 2v4M16 2v4M3 10h18" /><rect width="18" height="18" x="3" y="4" rx="2" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  checkCircle: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  circleHelp: <><circle cx="12" cy="12" r="9" /><path d="M9.1 9a3 3 0 1 1 5.72 1.28c-.76 1.3-2.82 1.72-2.82 3.72M12 17h.01" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  code: <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" />,
  copy: <><rect width="12" height="12" x="8" y="8" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>,
  creditCard: <><rect width="18" height="13" x="3" y="6" rx="2" /><path d="M3 10h18M7 15h2" /></>,
  download: <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />,
  external: <><path d="M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" /></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /></>,
  filter: <path d="M4 5h16M7 12h10m-7 7h4" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.9-8.6a5.5 5.5 0 0 0-.1-7.8Z" />,
  inbox: <><path d="M4 4h16v13a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z" /><path d="M4 14h4l2 3h4l2-3h4" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
  layout: <><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18M9 21V9" /></>,
  lock: <><rect width="14" height="11" x="5" y="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  mail: <><rect width="18" height="14" x="3" y="5" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  mapPin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  message: <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-3-.6L4 20l1.5-4A7 7 0 0 1 4 11.5a8 8 0 0 1 16 0Z" />,
  more: <path d="M5 12h.01M12 12h.01M19 12h.01" />,
  mousePointer: <path d="m5 3 14 9-6 1-3 6Z" />,
  play: <path d="m9 6 8 6-8 6Z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" /></>,
  send: <path d="m22 2-7 20-4-9-9-4Z M22 2 11 13" />,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.1 2.1-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.04 1.56v.1h-3v-.1a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-2.1-2.1.06-.06A1.7 1.7 0 0 0 7 15a1.7 1.7 0 0 0-1.56-1.04h-.1v-3h.1A1.7 1.7 0 0 0 7 9.92a1.7 1.7 0 0 0-.34-1.88L6.6 8l2.1-2.1.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.04-1.56v-.1h3v.1a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.1 2.1-.06.06A1.7 1.7 0 0 0 19.4 9.9a1.7 1.7 0 0 0 1.56 1.04h.1v3h-.1A1.7 1.7 0 0 0 19.4 15Z" /></>,
  sliders: <path d="M4 7h8M16 7h4M4 17h4m8 0h4M12 4v6M8 14v6M8 17h8" />,
  sparkles: <path d="m12 3-1.1 4.1L7 8.2l3.9 1.1L12 13l1.1-3.7L17 8.2l-3.9-1.1L12 3ZM5 15l-.6 2.4L2 18l2.4.6L5 21l.6-2.4L8 18l-2.4-.6L5 15Zm14-1-1 3-3 1 3 1 1 3 1-3 3-1-3-1-1-3Z" />,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z" />,
  terminal: <><path d="m5 7 4 4-4 4M12 15h7" /><rect width="20" height="16" x="2" y="4" rx="2" /></>,
  thumbsDown: <path d="M10 15v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Zm0 0 2-8a2 2 0 0 1 2-2c1.1 0 2 .9 2 2v4h3.6a2.4 2.4 0 0 1 2.3 3l-1.3 5A3 3 0 0 1 18.3 21H10" />,
  thumbsUp: <path d="M14 9V4a2 2 0 0 0-2-2l-3.6 7H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2.5a3 3 0 0 0 2.8-2l1.3-3H18a2.4 2.4 0 0 0 2.3-3l-.7-3A2.4 2.4 0 0 0 17.3 9H14Z" />,
  upload: <path d="M12 16V4m0 0-4 4m4-4 4 4M5 20h14" />,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9.5" cy="7" r="4" /><path d="M21 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  video: <><rect width="18" height="14" x="3" y="5" rx="2" /><path d="m10 9 5 3-5 3Z" /></>,
  x: <path d="m6 6 12 12M18 6 6 18" />,
};

export default function PageIcon({ name, className = "", size = 20, strokeWidth = 1.8, ...props }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      {paths[name] || paths.circleHelp}
    </svg>
  );
}
