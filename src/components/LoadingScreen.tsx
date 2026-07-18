import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["Design", "Create", "Inspire"];
const DURATION = 2700;

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length);
    }, 900);

  const tick = (ts: number) => {
    if (startRef.current === null) startRef.current = ts;
    const elapsed = ts - startRef.current;
    const progress = Math.min(1, elapsed / DURATION);
    setCount(Math.floor(progress * 100));

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      setCount(100);
      setTimeout(onComplete, 400);
    }
  };

  rafRef.current = requestAnimationFrame(tick);

  return () => {
    clearInterval(wordTimer);
    cancelAnimationFrame(rafRef.current);
  };
}, [onComplete]);

return (
  <div className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between overflow-hidden">
    {/* Top Header */}
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pt-8 px-6 md:pt-10 md:px-10"
    >
      <span className="text-xs text-muted uppercase tracking-[0.3em]">
        Portfolio
      </span>
    </motion.div>

    {/* Center Hero Logo & Text Core */}
<div className="flex-1 flex flex-col items-center justify-center gap-10 px-6">
  {/* 3D Coin Flipping Container */}
  <div className="perspective-1000 w-52 h-52 md:w-64 md:h-64 flex items-center justify-center">
    <motion.div
      initial={{ scale: 0.3, opacity: 0, rotateY: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1, 
        rotateY: 1800 // Flips exactly 5 times over the duration
      }}
      transition={{ 
        duration: DURATION / 1000, 
        ease: [0.25, 1, 0.5, 1] 
      }}
      className="relative w-full h-full rounded-full preserve-3d shadow-[0_0_50px_rgba(52,211,153,0.15)] flex items-center justify-center"
    >
      {/* Front Side of the Coin (No extra padding to prevent square borders) */}
      <div className="w-full h-full rounded-full overflow-hidden backface-hidden">
        <img
          src="public/Capture.PNG"
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Back Side of the Coin */}
      <div className="absolute inset-0 rounded-full overflow-hidden backface-hidden rotate-y-180">
        <img
          src="/Capture.PNG"
          alt="Logo Back"
          className="w-full h-full object-cover opacity-40 scale-x-[-1]"
        />
      </div>
    </motion.div>
  </div>

  {/* Morphing Word Matrix */}
  <div className="h-12 flex items-center justify-center">
    <AnimatePresence mode="wait">
      <motion.span
        key={wordIndex}
        initial={{ y: 15, opacity: 0, filter: "blur(4px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: -15, opacity: 0, filter: "blur(4px)" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="text-3xl md:text-5xl font-display italic text-text-primary/90 tracking-wide"
      >
        {WORDS[wordIndex]}
      </motion.span>
    </AnimatePresence>
  </div>
</div>

    {/* Numerical Progress Indicator */}
    <div className="px-6 pb-4 md:px-10 flex justify-end">
      <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary/95 tabular-nums tracking-tighter">
        {String(count).padStart(3, "0")}
      </span>
    </div>

    {/* Linear Track Load Bar */}
    <div className="relative h-[3px] bg-stroke/30 w-full">
      <div
        className="accent-gradient h-full origin-left transition-transform duration-100 ease-linear"
        style={{
          transform: `scaleX(${count / 100})`,
          boxShadow: "0 0 12px rgba(52, 211, 153, 0.4)",
        }}
      />
    </div>
  </div>
);
}