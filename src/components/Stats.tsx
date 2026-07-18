import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface StatItem {
  targetValue: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { targetValue: 1, suffix: "+ Years Industry", label: "Professional SDLC Record" },
  { targetValue: 4, suffix: " Production Hubs", label: "Live System Deployments" },
  { targetValue: 9, suffix: ".00 CGPA Focus", label: "Information Technology BSc" },
  { targetValue: 4, suffix: " Core Credentials", label: "AWS Practitioner & Technical Certs" },
];

function Counter({ targetValue, suffix, trigger }: { targetValue: number; suffix: string; trigger: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const duration = 1500; // 1.5 Seconds execution cycle
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime >= duration) {
        setCount(targetValue);
        return;
      }
      
      // Smooth cubic out ease for counting velocity
      const progress = 1 - Math.pow(1 - elapsedTime / duration, 3);
      setCount(Math.floor(progress * targetValue));
      requestAnimationFrame(updateCounter);
    };

    requestAnimationFrame(updateCounter);
  }, [trigger, targetValue]);

  return (
    <span className="font-display italic text-4xl md:text-5xl lg:text-6xl text-text-primary mb-2">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  // Track unique triggered states per element using simple index lookups
  const [triggered, setTriggered] = useState<Record<number, boolean>>({});

  return (
    <section className="bg-bg py-16 md:py-24 overflow-hidden border-t border-stroke/30">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              onViewportEnter={() => setTriggered((prev) => ({ ...prev, [i]: true }))}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative p-6 rounded-2xl border border-stroke/40 bg-surface/10 backdrop-blur-sm hover:border-text-primary/30 group transition-all duration-500 overflow-hidden"
            >
              {/* Internal abstract linear network highlight */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-green-400/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              <div className="flex flex-col justify-between h-full relative z-10">
                <Counter targetValue={stat.targetValue} suffix={stat.suffix} trigger={!!triggered[i]} />
                
                <div className="text-[10px] md:text-xs text-muted uppercase tracking-[0.2em] mt-4 border-t border-stroke/40 pt-3 group-hover:text-text-primary transition-colors">
                  {stat.label}
                </div>
              </div>

              {/* Unique atmospheric radial background hover signature */}
              <div className="absolute -inset-px bg-radial-glow opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500" 
                style={{
                  background: "radial-gradient(circle at 50% 120%, var(--tw-gradient-stops), transparent 70%)",
                  backgroundImage: "linear-gradient(to top right, #22c55e, transparent)"
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}