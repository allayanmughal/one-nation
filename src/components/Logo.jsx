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

        <img
        src="/logo.jpeg"
        alt="Logo"
        className="h-full w-auto flex-shrink-0"
      />

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
