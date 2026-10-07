import Image from "next/image";

interface DeviceMockupProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function DeviceMockup({ src, alt, className = "", imageClassName = "object-cover object-top", priority = false }: DeviceMockupProps) {
  return (
    <div className={`relative flex flex-col bg-zinc-950 border-t-[6px] border-x-[6px] md:border-t-[12px] md:border-x-[12px] border-zinc-950 rounded-t-[2.5rem] md:rounded-t-[3rem] shadow-2xl overflow-hidden shrink-0 ring-1 ring-border/20 ${className}`}>
      
      {/* Outer edge highlight */}
      <div className="absolute inset-0 rounded-t-[2.5rem] md:rounded-t-[3rem] shadow-[inset_0_0_2px_rgba(255,255,255,0.4)] pointer-events-none z-50" />

      {/* Dynamic Island / Notch */}
      <div className="absolute top-2 md:top-3 inset-x-0 flex justify-center z-40">
        <div className="w-[30%] md:w-[35%] h-5 md:h-7 bg-black rounded-full flex items-center justify-end px-2 md:px-3 shadow-[inset_0_0_1px_rgba(255,255,255,0.1)]">
          {/* Camera Lens */}
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-zinc-900 shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]" />
        </div>
      </div>

      <div className="relative w-full h-full overflow-hidden rounded-t-[1.8rem] md:rounded-t-[2.3rem] bg-white dark:bg-[#141414] flex flex-col">
        {/* Fake Status Bar */}
        <div className="absolute top-0 inset-x-0 h-7 md:h-9 flex items-center justify-between px-5 md:px-6 z-40 pointer-events-none">
          {/* Time */}
          <span className="text-[9px] md:text-[10px] font-semibold text-foreground/80 w-[30%] pl-0.5 mt-0.5">9:41</span>
          
          {/* Icons */}
          <div className="flex items-center justify-end gap-1 md:gap-1.5 w-[30%] pr-0.5">
            {/* Cellular */}
            <div className="flex items-end gap-[1px] md:gap-[1.5px] h-2 md:h-2.5">
              <div className="w-[1.5px] h-1 bg-foreground/80 rounded-[1px]" />
              <div className="w-[1.5px] h-1.5 bg-foreground/80 rounded-[1px]" />
              <div className="w-[1.5px] h-2 bg-foreground/80 rounded-[1px]" />
              <div className="w-[1.5px] h-full bg-foreground/80 rounded-[1px]" />
            </div>
            {/* Wifi */}
            <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-foreground/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
            {/* Battery */}
            <div className="w-[14px] md:w-[16px] h-2 md:h-[9px] border border-foreground/60 rounded-[2px] md:rounded-[3px] p-[1px] relative flex items-center">
              <div className="w-[80%] h-full bg-foreground/80 rounded-[1px]" />
              <div className="absolute -right-[2px] w-[1.5px] h-[4px] bg-foreground/60 rounded-r-[1px]" />
            </div>
          </div>
        </div>

        {/* Status bar safe area - Reduced to tightly hug the notch */}
        <div className="w-full h-7 md:h-9 shrink-0" />
        
        <div className="relative w-full h-full">
          <Image 
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 300px, 400px"
            className={imageClassName}
            priority={priority}
          />
        </div>
      </div>
    </div>
  );
}
