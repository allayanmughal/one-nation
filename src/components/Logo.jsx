import React from 'react';

export default function Logo({ className = "h-12 w-12", showText = true, lightModeColor = "text-primary", darkModeColor = "dark:text-white" }) {
  // Generate a 36-point starburst (72 coordinates)
  // Center = (100, 100)
  const generateStarburstPoints = () => {
    const points = [];
    const center = 100;
    const outerRadius = 95;
    const innerRadius = 88;
    const totalPoints = 72; // 36 tips, 36 valleys

    for (let i = 0; i < totalPoints; i++) {
      const angle = (i * 360) / totalPoints;
      const angleRad = (angle * Math.PI) / 180;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = center + radius * Math.cos(angleRad);
      const y = center + radius * Math.sin(angleRad);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return points.join(' ');
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Seal/Badge */}
      <svg
        viewBox="0 0 200 200"
        className="h-full w-auto flex-shrink-0 drop-shadow-md transition-transform duration-300 hover:rotate-6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Jagged Sunburst Outer Border */}
        <polygon
          points={generateStarburstPoints()}
          className="fill-primary dark:fill-primary-light stroke-accent stroke-[1.5]"
        />

        {/* Outer Circular Ring */}
        <circle
          cx="100"
          cy="100"
          r="84"
          className="stroke-white stroke-[2]"
        />

        {/* Inner Circle Background */}
        <circle
          cx="100"
          cy="100"
          r="78"
          className="fill-primary-dark"
        />

        {/* Stylized "1" / "7" Character in Center */}
        {/* We build a large stylized numeric shape that resembles a futuristic 1 with a horizontal top (looks like a 7 merging into nation) */}
        <g className="text-white fill-current">
          {/* Main Diagonal stem of 7/1 */}
          <path d="M 85 55 L 115 55 L 98 120 L 76 120 Z" className="fill-accent" />
          {/* Top horizontal flag */}
          <path d="M 68 64 L 85 55 L 115 55 L 105 72 L 78 72 Z" className="fill-white" stroke="white" strokeWidth="1" />
          {/* Bottom base plate */}
          <path d="M 70 120 L 108 120 L 104 126 L 66 126 Z" className="fill-white" />
        </g>

        {/* Brand Text: NATION Pakistan */}
        <text
          x="100"
          y="102"
          textAnchor="middle"
          className="font-brand font-bold text-[18px] fill-white tracking-wider uppercase"
        >
          NATION
        </text>
        <text
          x="100"
          y="114"
          textAnchor="middle"
          className="font-sans font-medium text-[9px] fill-accent tracking-widest uppercase"
        >
          PAKISTAN
        </text>

        {/* Stars */}
        {/* Left Star */}
        <polygon
          points="46,105 48,109 52,109 49,112 50,116 46,114 42,116 43,112 40,109 44,109"
          className="fill-accent"
        />
        {/* Right Star */}
        <polygon
          points="154,105 156,109 160,109 157,112 158,116 154,114 150,116 151,112 148,109 152,109"
          className="fill-accent"
        />

        {/* Path for curved Tagline "BE A NATION NOT SEPARATION" */}
        {/* Arc path along the bottom half: radius 65, from left (35,100) to right (165,100) */}
        <path
          id="taglinePath"
          d="M 32,105 A 68,68 0 0,0 168,105"
          fill="none"
        />

        <text className="font-sans font-semibold text-[8.5px] fill-white tracking-widest uppercase">
          <textPath href="#taglinePath" startOffset="50%" textAnchor="middle">
            Be a Nation, Not Separation
          </textPath>
        </text>
      </svg>

      {/* Brand text on the side if showText is true */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-display font-extrabold text-lg tracking-tight leading-none ${lightModeColor} ${darkModeColor}`}>
            1 NATION
          </span>
          <span className="font-sans font-semibold text-[10px] tracking-[0.2em] text-accent uppercase leading-none mt-1">
            PAKISTAN
          </span>
        </div>
      )}
    </div>
  );
}
