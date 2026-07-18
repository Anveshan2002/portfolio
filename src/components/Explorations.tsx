import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface ExplorationItem {
  title: string;
  subtitle: string;
  tech: string;
  img: string;
  rotate: number;
}

const ITEMS: ExplorationItem[] = [
  {
    title: "RAG Internal Assistant",
    subtitle: "Built an internal LLM context agent using Retrieval-Augmented Generation to surface internal codebase documentation.",
    tech: "Node.js • GCP • LangChain",
    // Visualizing code structures, generative nodes, and algorithmic parsing
    img: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=600&auto=format&fit=crop",
    rotate: -4,
  },
  {
    title: "Redis Latency Reduction",
    subtitle: "Implemented high-performance caching strategies to optimize database workloads and slash server side response latency.",
    tech: "Redis Caching • Express.js",
    // High-speed light trails / server throughput abstraction
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    rotate: 3,
  },
  {
    title: "AWS Security Configuration",
    subtitle: "Constructed strict IAM role policies, multi-tier network topologies, and monitored service architectures during deployment tests.",
    tech: "AWS EC2 • S3 • IAM Policies",
    // Clean server hardware / secure datacenters
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
    rotate: -2,
  },
  {
    title: "Microservices Integration",
    subtitle: "Designed scalable loose couplings between services enabling decoupled systems communication via secure API gates.",
    tech: "RESTful APIs • Spring Boot",
    // Complex nodes / abstract technological connections
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    rotate: 5,
  },
  {
    title: "NoSQL Schema Design",
    subtitle: "Engineered scalable collections structures inside high-throughput non-relational database nodes.",
    tech: "MongoDB Collections Design",
    // Matrix data visualization / schema trees
    img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600&auto=format&fit=crop",
    rotate: -3,
  },
  {
    title: "GCP Compute Infrastructures",
    subtitle: "Orchestrated cloud compute runtime blocks optimizing configurations for structural system stability.",
    tech: "Google Cloud Platform Compute",
    // Modern mainframe cloud terminal visualization
    img: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600&auto=format&fit=crop",
    rotate: 4,
  },
];

const colA = ITEMS.filter((_, i) => i % 2 === 0);
const colB = ITEMS.filter((_, i) => i % 2 === 1);

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const colARef = useRef<HTMLDivElement | null>(null);
  const colBRef = useRef<HTMLDivElement | null>(null);
  const [lightbox, setLightbox] = useState<ExplorationItem | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      gsap.to(colARef.current, {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(colBRef.current, {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] bg-bg">
      {/* Pinned center content */}
      <div
        ref={contentRef}
        className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">
            Research & Development
          </span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4">
          Technical <span className="italic">sandbox</span>
        </h2>
        <p className="text-sm md:text-base text-muted max-w-md mb-8">
          Architectural micro-benchmarks, cloud topology testing, and engine performance optimization experiments.
        </p>
        <a
          href="https://linkedin.com/in/anveshan-parichha-862b2a363"
          target="_blank"
          rel="noreferrer"
          className="group relative rounded-full p-[2px]"
        >
          <span className="absolute inset-0 rounded-full border-2 border-stroke bg-bg group-hover:border-transparent group-hover:accent-gradient transition-all duration-300" />
          <span className="relative block bg-bg rounded-full px-7 py-3.5 text-sm text-text-primary m-[2px]">
            Follow Engineering Updates
          </span>
        </a>
      </div>

      {/* Parallax columns */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="grid grid-cols-2 gap-12 md:gap-40 max-w-[1400px] w-full px-6">
          <div ref={colARef} className="flex flex-col gap-10 md:gap-16 items-end">
            {colA.map((item, i) => (
              <button
                key={i}
                onClick={() => setLightbox(item)}
                className="pointer-events-auto relative group aspect-square w-full max-w-[320px] rounded-2xl overflow-hidden border border-stroke bg-surface transition-transform duration-300 hover:scale-105"
                style={{ transform: `rotate(${item.rotate}deg)` }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center text-center">
                  <span className="text-white text-xs font-mono font-bold tracking-wide">{item.title}</span>
                  <span className="text-[10px] text-muted/80 font-mono mt-1">{item.tech}</span>
                </div>
              </button>
            ))}
          </div>
          <div ref={colBRef} className="flex flex-col gap-10 md:gap-16 items-start">
            {colB.map((item, i) => (
              <button
                key={i}
                onClick={() => setLightbox(item)}
                className="pointer-events-auto relative group aspect-square w-full max-w-[320px] rounded-2xl overflow-hidden border border-stroke bg-surface transition-transform duration-300 hover:scale-105"
                style={{ transform: `rotate(${item.rotate}deg)` }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center text-center">
                  <span className="text-white text-xs font-mono font-bold tracking-wide">{item.title}</span>
                  <span className="text-[10px] text-muted/80 font-mono mt-1">{item.tech}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Lightbox Overlay */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[999] bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-xl w-full bg-surface border border-stroke p-5 rounded-3xl shadow-2xl text-left cursor-default"
            >
              <img
                src={lightbox.img}
                alt={lightbox.title}
                className="w-full h-48 md:h-64 object-cover rounded-xl border border-stroke/40 mb-4"
              />
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-text-primary uppercase tracking-wide">
                  {lightbox.title}
                </h3>
                <span className="text-xs font-mono bg-bg border border-stroke/60 text-text-primary px-2.5 py-1 rounded-md">
                  {lightbox.tech}
                </span>
              </div>
              <p className="text-sm text-muted leading-relaxed font-sans">
                {lightbox.subtitle}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}