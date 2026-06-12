export default function Bottle({
  hues,
  name,
  className = "h-64 w-auto md:h-80",
}: {
  hues: [string, string];
  name: string;
  className?: string;
}) {
  const id = name.toLowerCase();
  return (
    <svg
      viewBox="0 0 200 320"
      className={className}
      role="img"
      aria-label={`${name} flacon`}
    >
      <defs>
        <linearGradient id={`liquid-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hues[0]} />
          <stop offset="100%" stopColor={hues[1]} />
        </linearGradient>
        <linearGradient id={`shine-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`body-${id}`}>
          <path d="M60 140 Q60 116 84 116 L116 116 Q140 116 140 140 L140 286 Q140 302 124 302 L76 302 Q60 302 60 286 Z" />
        </clipPath>
      </defs>
      {/* cap */}
      <rect x="86" y="30" width="28" height="48" rx="3" fill="#1d1916" stroke="#3a332c" strokeWidth="1" />
      {/* gold collar */}
      <rect x="84" y="78" width="32" height="9" fill="#8a6430" />
      {/* neck */}
      <rect x="88" y="87" width="24" height="31" fill="#15110e" stroke="#3a332c" strokeWidth="1" />
      {/* glass body with soft shoulders */}
      <path
        d="M60 140 Q60 116 84 116 L116 116 Q140 116 140 140 L140 286 Q140 302 124 302 L76 302 Q60 302 60 286 Z"
        fill="#0f0c0a"
        stroke="#473e33"
        strokeWidth="1.2"
      />
      {/* liquid, clipped to the glass */}
      <g clipPath={`url(#body-${id})`}>
        <rect x="60" y="142" width="80" height="160" fill={`url(#liquid-${id})`} opacity="0.92" />
        <ellipse cx="100" cy="142" rx="40" ry="5" fill={hues[0]} opacity="0.55" />
        <rect x="70" y="116" width="11" height="186" fill={`url(#shine-${id})`} opacity="0.5" />
      </g>
      {/* label rule */}
      <line x1="78" y1="226" x2="122" y2="226" stroke="#c79a52" strokeWidth="1" opacity="0.85" />
    </svg>
  );
}
