"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DeviceMockup } from "./DeviceMockup";
import { createPortal } from "react-dom";

interface DeviceLightboxProps {
  children: React.ReactNode;
  src: string;
  alt: string;
}

export function DeviceLightbox({ children, src, alt }: DeviceLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 text-foreground/70 hover:text-foreground bg-background/50 hover:bg-background/80 backdrop-blur-md rounded-full transition-all shadow-lg z-[110]"
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <motion.div
            key="lightbox-content"
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: "spring", bounce: 0.35, duration: 0.6 }}
            className="relative h-[85vh] max-h-[850px] aspect-[1/2.16] cursor-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <DeviceMockup
              src={src}
              alt={alt}
              className="w-full h-full"
              showBottomEdge={true}
              imageClassName="object-cover"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="cursor-pointer group/mockup relative w-full h-full"
      >
        <div className="absolute inset-0 z-50 flex items-center justify-center opacity-0 group-hover/mockup:opacity-100 transition-opacity bg-black/10 rounded-t-[2.5rem] md:rounded-t-[3rem]">
          <div className="bg-background/90 backdrop-blur-md text-foreground rounded-full p-3 shadow-xl transform scale-90 group-hover/mockup:scale-100 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/>
            </svg>
          </div>
        </div>
        {children}
      </div>
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
