import React from 'react';

export default function Logo({ className = "h-12 w-12", showText = true, showSlogan = true, lightModeColor = "text-white", darkModeColor = "dark:text-white" }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className={`${className} flex items-center justify-center`}>
        <img
          src="/logo.jpeg"
          alt="1 Nation Pakistan"
          className="h-full w-auto object-contain rounded-full bg-white dark:bg-dark-bg p-0.5 shadow-sm border border-transparent transition-all duration-300"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-display font-black text-sm sm:text-base tracking-tight leading-none ${lightModeColor} ${darkModeColor}`}>
            ONE NATION
          </span>
          <span className="font-sans font-black text-[9px] sm:text-[10px] tracking-[0.18em] text-accent uppercase leading-none mt-1">
            PAKISTAN
          </span>
          {showSlogan && (
            <span className="font-sans font-bold text-[7px] sm:text-[8px] tracking-[0.05em] text-accent-light dark:text-accent-light/80 uppercase leading-none mt-1">
              Be A Nation, Not Separation
            </span>
          )}
        </div>
      )}
    </div>
  );
}
