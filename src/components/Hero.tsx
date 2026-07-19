import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useHlsVideo } from "../hooks/useHlsVideo";
import Navbar from "./Navbar";

const ROLES = [
  "Software Engineer",
  "Full Stack Developer",
  "Cloud Technologies Specialist"
];

export default function Hero() {
  const videoRef = useHlsVideo();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Dynamic role text rotation interval loop
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // GSAP Cinematic Entrance Sequence Layout
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(".name-reveal", {
        opacity: 1,
        y: 0,
        duration: 1.4,
        delay: 0.2,
      }).to(
        ".blur-in",
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1.2,
          stagger: 0.15,
        },
        0.4
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Interactive Particle Smoke Nodes Engine Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      decay: number;
    }> = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      // Limit creation density rate slightly for premium fluid execution pacing
      if (Math.random() > 0.45) return;

      particles.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.5, // Subtle upward drift bias
        alpha: 0.6,
        decay: Math.random() * 0.008 + 0.004
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Clean high-contrast white/green code signature highlight trails
        ctx.fillStyle = `rgba(74, 222, 128, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(74, 222, 128, 0.4)";
        ctx.fill();
      }

      ctx.shadowBlur = 0; // Reset canvas blur pipeline memory
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-bg"
    >
      {/* Dynamic Interactive Geometric Particles Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none mix-blend-screen"
      />

      {/* Background Cinematic HLS Loop Canvas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-bg z-[1]" />
      </div>

      <Navbar />

      {/* Main Copy Context Block */}
      <div ref={textContainerRef} className="relative z-20 flex flex-col items-center text-center px-6 selection:bg-green-400 selection:text-black">
        <span className="blur-in text-xs text-muted uppercase tracking-[0.4em] mb-6 inline-block opacity-0 transform translate-y-4 font-mono">

        </span>

        <h1
          className="name-reveal font-display italic text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tighter text-text-primary mb-8 opacity-0 drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
          style={{ transform: "translateY(60px)" }}
        >
          ANVESHAN JOHN PARICHHA
        </h1>

        <p className="blur-in text-base md:text-xl text-muted mb-4 opacity-0 transform translate-y-4 font-sans" style={{ filter: "blur(8px)" }}>
          A{" "}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block font-bold tracking-wide border-b border-stroke/40 px-1"
          >
            {ROLES[roleIndex]}
          </span>{" "}
          based in Airoli, Navi Mumbai.
        </p>

        <p
          className="blur-in text-sm md:text-base text-muted max-w-2xl mb-12 leading-relaxed opacity-0 transform translate-y-4"
          style={{ filter: "blur(8px)" }}
        >
          Designing, developing, and deploying high-performance full-stack web and mobile applications
          with robust microservices and optimized cloud infrastructure.
        </p>

        <div className="blur-in inline-flex items-center gap-5 opacity-0 transform translate-y-4" style={{ filter: "blur(8px)" }}>
          <a
            href="#work"
            className="rounded-full text-sm font-semibold tracking-wide px-8 py-4 bg-text-primary text-bg transition-all duration-300 hover:scale-105 hover:bg-green-400 hover:text-black shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_25px_rgba(74,222,128,0.3)]"
          >
            Explore Systems
          </a>

          {/* Updated Resume Download Button */}
          <a
            href="./Anveshan_John_Parichha_Resume.pdf"
            download="Anveshan_John_Parichha_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-full text-sm p-[2px] transition-transform duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full border border-stroke bg-bg/40 backdrop-blur-sm group-hover:border-transparent group-hover:accent-gradient transition-all duration-300" />
            <span className="relative block bg-bg/80 backdrop-blur-md rounded-full px-8 py-4 text-text-primary font-medium m-[1px] group-hover:text-white transition-colors">
              Download Resume
            </span>
          </a>
        </div>
      </div>

      {/* Atmospheric Ambient Bottom Gradient Split */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg via-bg/65 to-transparent z-[5] pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 select-none pointer-events-none">
        <span className="text-[10px] text-muted uppercase tracking-[0.25em] font-mono">
          Scroll
        </span>
        <div className="relative w-[2px] h-12 bg-stroke/60 overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-5 bg-text-primary animate-scroll-down rounded-full" />
        </div>
      </div>
    </section>
  );
}