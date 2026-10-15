import Image from "next/image";

interface DeviceMockupProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  showBottomEdge?: boolean;
}

export function DeviceMockup({
  src,
  alt,
  className = "",
  imageClassName = "object-cover object-top",
  priority = false,
  showBottomEdge = false,
}: DeviceMockupProps) {
  // Unified outer metallic chassis rounding
  const outerRounding = showBottomEdge
    ? "rounded-[3rem]"
    : "rounded-t-[3rem] rounded-b-none";

  // Unified inner black glass bezel padding
  const bezelPadding = showBottomEdge
    ? "p-[10px]"
    : "pt-[10px] px-[10px] pb-0";

  // Unified screen viewport rounding
  const screenRounding = showBottomEdge
    ? "rounded-[2.4rem]"
    : "rounded-t-[2.4rem] rounded-b-none";

  return (
    <div className={`relative select-none shrink-0 ${className}`}>
      {/* PIXEL HARDWARE BUTTONS (Right Rail: Power on Top, Volume Below) */}
      {/* Power Button */}
      <div
        aria-hidden="true"
        className="absolute -right-[3px] top-[22%] w-[3.5px] h-11 bg-gradient-to-b from-zinc-500 via-zinc-700 to-zinc-800 rounded-r-sm shadow-sm z-0"
      />
      {/* Volume Rocker */}
      <div
        aria-hidden="true"
        className="absolute -right-[3px] top-[35%] w-[3.5px] h-20 bg-gradient-to-b from-zinc-500 via-zinc-700 to-zinc-800 rounded-r-sm shadow-sm z-0"
      />

      {/* OUTER ANODIZED ALUMINUM CHASSIS */}
      <div
        className={`relative w-full h-full flex flex-col bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-900 p-[2.5px] shadow-[0_20px_50px_rgba(0,0,0,0.35)] ${outerRounding}`}
      >
        {/* Metallic rim specular highlight */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)] z-50 ${outerRounding}`}
        />

        {/* INNER BLACK GLASS BEZEL */}
        <div
          className={`relative w-full h-full flex flex-col bg-zinc-950 ${bezelPadding} ${outerRounding} overflow-hidden`}
        >
          {/* Top Earpiece Speaker Slit */}
          <div
            aria-hidden="true"
            className="absolute top-[4px] left-1/2 -translate-x-1/2 w-14 h-[2px] bg-zinc-800/90 rounded-full z-40"
          />

          {/* SCREEN VIEWPORT */}
          <div
            className={`relative w-full h-full overflow-hidden ${screenRounding} bg-white dark:bg-[#121212] flex flex-col ring-1 ring-white/10`}
          >
            {/* PIXEL HOLE-PUNCH CAMERA + ANDROID STATUS BAR */}
            <div className="relative w-full h-10 pt-1 flex items-center justify-between px-7 z-40 shrink-0 pointer-events-none">
              {/* Left: Google Pixel Marketing Time (9:30) */}
              <span className="text-[12px] font-semibold tracking-tight text-foreground/85 leading-none">
                9:30
              </span>

              {/* Center: Pixel Hole-Punch Selfie Camera */}
              <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-3.5 h-3.5 rounded-full bg-black ring-1 ring-white/15 flex items-center justify-center shadow-inner">
                {/* Subtle sapphire lens glint */}
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-950/90 ring-[0.5px] ring-blue-400/35" />
              </div>

              {/* Right: Android Status Icons (Wi-Fi, 5G Cellular Triangle, Vertical Battery) */}
              <div className="flex items-center gap-1.5 text-foreground/85">
                {/* Android Solid Wi-Fi Wedge */}
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21L23.6 7C20.3 4.5 16.3 3 12 3C7.7 3 3.7 4.5 0.4 7L12 21Z" />
                </svg>

                {/* Android Solid Signal Triangle */}
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2 22h20V2L2 22z" />
                </svg>

                {/* Android Vertical Battery Icon */}
                <div className="flex flex-col items-center">
                  <div className="w-1.5 h-[1.5px] bg-foreground/75 rounded-t-[1px]" />
                  <div className="w-2 h-3 border-[1.2px] border-foreground/85 rounded-[2px] p-[0.5px] flex items-end">
                    <div className="w-full h-[80%] bg-foreground/85 rounded-[0.5px]" />
                  </div>
                </div>
              </div>
            </div>

            {/* APP SCREENSHOT */}
            <div className="relative w-full flex-1">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 1024px) 300px, 400px"
                className={imageClassName}
                priority={priority}
              />
            </div>

            {/* Subtle Screen Glass Glare */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] pointer-events-none z-30"
            />

            {/* Android Bottom Gesture Navigation Bar (when full phone is shown) */}
            {showBottomEdge && (
              <div
                aria-hidden="true"
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-foreground/30 rounded-full z-40 pointer-events-none"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}