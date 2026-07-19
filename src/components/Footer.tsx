
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useHlsVideo } from "../hooks/useHlsVideo";

// gsap.registerPlugin(ScrollTrigger);

// const SKILL_CATEGORIES = [
//   {
//     category: "Languages & Frameworks",
//     skills: ["React.js", "Angular.js", "Next.js", "Java", "Python", "JavaScript"]
//   },
//   {
//     category: "Backend & Architecture",
//     skills: ["Node.js", "Microservices", "RESTful APIs", "Express.js"]
//   },
//   {
//     category: "Databases & Caching",
//     skills: ["PostgreSQL", "MongoDB", "Redis Caching", "SQL Server"]
//   },
//   {
//     category: "Cloud & DevOps",
//     skills: ["AWS (EC2, S3, IAM)", "Google Cloud Platform (GCP)", "CI/CD Fundamentals"]
//   }
// ];

// const SOCIALS = [
//   { name: "LinkedIn", url: "https://linkedin.com/in/anveshan-parichha-862b2a363" },
//   { name: "GitHub", url: "https://github.com/Anveshan2002" }
// ];

// interface SparkParticle {
//   x: number;
//   y: number;
//   size: number;
//   speedX: number;
//   speedY: number;
//   opacity: number;
//   decay: number;
//   color: string;
// }

// export default function Footer() {
//   const videoRef = useHlsVideo();
//   const footerRef = useRef<HTMLDivElement | null>(null);
//   const cardsRef = useRef<HTMLDivElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     if (!cardsRef.current) return;

//     const cards = cardsRef.current.querySelectorAll(".skill-card");

//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: cardsRef.current,
//           start: "top 85%",
//           end: "bottom 90%",
//           scrub: 1.5,
//         }
//       });

//       cards.forEach((card) => {
//         const header = card.querySelector("h4");
//         const badges = card.querySelectorAll(".skill-badge");

//         tl.fromTo(card,
//           {
//             filter: "blur(25px)",
//             opacity: 0,
//             y: 40,
//             scale: 0.95,
//             backgroundColor: "rgba(24, 24, 27, 0)"
//           },
//           {
//             filter: "blur(0px)",
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             backgroundColor: "rgba(39, 39, 42, 0.2)",
//             duration: 1.5,
//             ease: "power2.out"
//           },
//           0
//         );

//         if (header) {
//           tl.fromTo(header,
//             { filter: "blur(10px)", letterSpacing: "0.3em", opacity: 0 },
//             { filter: "blur(0px)", letterSpacing: "0.15em", opacity: 1, duration: 1.2 },
//             0.2
//           );
//         }

//         if (badges.length > 0) {
//           tl.fromTo(badges,
//             {
//               filter: "blur(12px)",
//               opacity: 0,
//               y: 15,
//               scale: 0.8
//             },
//             {
//               filter: "blur(0px)",
//               opacity: 1,
//               y: 0,
//               scale: 1,
//               stagger: 0.08,
//               duration: 1,
//               ease: "power3.out"
//             },
//             0.3
//           );
//         }
//       });
//     }, footerRef);

//     return () => ctx.revert();
//   }, []);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let animationFrameId: number;
//     let sparks: SparkParticle[] = [];
//     const mouse = { x: -1000, y: -1000, radius: 120 };

//     const resizeCanvas = () => {
//       if (canvas && footerRef.current) {
//         canvas.width = footerRef.current.offsetWidth;
//         canvas.height = footerRef.current.offsetHeight;
//       }
//     };
//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     const createSpark = (x: number, y: number, isBurst = false): SparkParticle => {
//       const colors = ["#ffffff", "#a3a3a3", "#22c55e", "#4ade80", "#18181b"];
//       return {
//         x,
//         y,
//         size: Math.random() * (isBurst ? 3.5 : 2) + 0.5,
//         speedX: (Math.random() - 0.5) * (isBurst ? 4 : 1.2),
//         speedY: -Math.random() * (isBurst ? 4 : 1.5) - 0.5,
//         opacity: Math.random() * 0.6 + 0.4,
//         decay: Math.random() * 0.005 + 0.002,
//         color: colors[Math.floor(Math.random() * colors.length)],
//       };
//     };

//     const triggerDisintegrationBurst = () => {
//       if (!canvas) return;
//       const count = 120;
//       for (let i = 0; i < count; i++) {
//         const x = Math.random() * canvas.width;
//         const y = canvas.height - Math.random() * 80;
//         sparks.push(createSpark(x, y, true));
//       }
//     };

//     const trigger = ScrollTrigger.create({
//       trigger: footerRef.current,
//       start: "top 80%",
//       onEnter: () => {
//         triggerDisintegrationBurst();
//       },
//     });

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       if (sparks.length < 200 && Math.random() < 0.3) {
//         sparks.push(createSpark(Math.random() * canvas.width, canvas.height + 10));
//       }

//       for (let i = sparks.length - 1; i >= 0; i--) {
//         const p = sparks[i];
//         p.y += p.speedY;
//         p.x += p.speedX + Math.sin(p.y * 0.008) * 0.15;
//         p.opacity -= p.decay;

//         const dx = p.x - mouse.x;
//         const dy = p.y - mouse.y;
//         const distance = Math.sqrt(dx * dx + dy * dy);
//         if (distance < mouse.radius) {
//           const force = (mouse.radius - distance) / mouse.radius;
//           const angle = Math.atan2(dy, dx);
//           p.x += Math.cos(angle) * force * 3;
//           p.y += Math.sin(angle) * force * 3;
//         }

//         ctx.save();
//         ctx.globalAlpha = p.opacity;
//         ctx.fillStyle = p.color;
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.restore();

//         if (p.opacity <= 0 || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
//           sparks.splice(i, 1);
//         }
//       }

//       animationFrameId = requestAnimationFrame(animate);
//     };
//     animate();

//     const handleMouseMove = (e: MouseEvent) => {
//       if (!footerRef.current) return;
//       const rect = footerRef.current.getBoundingClientRect();
//       mouse.x = e.clientX - rect.left;
//       mouse.y = e.clientY - rect.top;
//     };

//     const handleMouseLeave = () => {
//       mouse.x = -1000;
//       mouse.y = -1000;
//     };

//     const footerElement = footerRef.current;
//     if (footerElement) {
//       footerElement.addEventListener("mousemove", handleMouseMove);
//       footerElement.addEventListener("mouseleave", handleMouseLeave);
//     }

//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//       cancelAnimationFrame(animationFrameId);
//       trigger.kill();
//       if (footerElement) {
//         footerElement.removeEventListener("mousemove", handleMouseMove);
//         footerElement.removeEventListener("mouseleave", handleMouseLeave);
//       }
//     };
//   }, []);

//   return (
//     <footer
//       id="skills"
//       ref={footerRef}
//       className="relative pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden bg-bg"
//     >
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 z-10 pointer-events-none mix-blend-screen"
//       />

//       <div className="absolute inset-0 z-0 overflow-hidden">
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
//         />
//         <div className="absolute inset-0 bg-black/90" />
//       </div>

//       <div className="relative z-20 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

//         {/* Section Header */}
//         <div className="mb-10 flex items-center gap-3">
//           <span className="w-8 h-px bg-stroke" />
//           <span className="text-xs text-muted uppercase tracking-[0.3em]">
//             Technical Stack
//           </span>
//         </div>

//         {/* Categorized Skills Grid */}
//         <div ref={cardsRef} className="relative mb-20 md:mb-28">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {SKILL_CATEGORIES.map((cat, idx) => (
//               <div
//                 key={idx}
//                 className="skill-card p-6 rounded-2xl bg-surface/20 border border-stroke/40 backdrop-blur-md hover:border-text-primary/40 hover:bg-surface/30 transition-all duration-300 group relative overflow-hidden"
//               >
//                 <div className="absolute -inset-px bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
//                 <h4 className="text-xs font-mono text-muted uppercase tracking-[0.15em] mb-4 group-hover:text-text-primary transition-colors">
//                   {cat.category}
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {cat.skills.map((skill) => (
//                     <span
//                       key={skill}
//                       className="skill-badge text-xs font-medium text-text-primary bg-bg/50 border border-stroke/30 px-3 py-1.5 rounded-lg hover:bg-text-primary hover:text-bg transition-colors duration-200"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Dual Column Contact Zone - Harmonized Layout Alignment */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 md:mb-24 border-b border-stroke/20 pb-16">
          
//           {/* Left Column: Cleanly Centered Interaction Target Items */}
//           <div className="flex flex-col items-center justify-center text-center">
//             <span className="text-xs text-muted uppercase tracking-[0.3em] mb-6 font-mono">
//               Initiate Connection
//             </span>

//             {/* Gmail Web Redirect Link */}
//             <a
//               href="https://mail.google.com/mail/?view=cm&fs=1&to=anveshanjohn004@gmail.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group relative rounded-full p-[2px] mb-4 inline-block shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
//             >
//               <span
//                 className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 accent-gradient transition-opacity duration-300"
//                 style={{ backgroundSize: "200% 200%" }}
//               />
//               <span className="relative flex items-center gap-2 bg-bg border border-stroke group-hover:border-transparent rounded-full px-8 py-4 text-base sm:text-lg md:text-xl font-display italic text-text-primary tracking-wide transition-all">
//                 anveshanjohn004@gmail.com <span aria-hidden>↗</span>
//               </span>
//             </a>

//             {/* Centered Clickable Phone Link */}
//             <a
//               href="tel:+919321788606"
//               rel="noopener noreferrer"
//               className="text-xs sm:text-sm font-mono text-muted tracking-wider hover:text-text-primary transition-colors duration-200 mt-1"
//             >
//               +91 9321788606
//             </a>
//           </div>

//           {/* Right Column: Premium Geometrically Perfect Circular Avatar Rim */}
//           <div className="flex justify-center items-center">
//             <div className="relative group w-48 h-48 sm:w-56 sm:h-56 rounded-full p-[2px] transition-all duration-500 hover:scale-[1.03]">
              
//               {/* Ultra-Smooth High-Contrast Outer Ambient Glow Ring */}
//               <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-500/20 via-emerald-400/10 to-transparent blur-md group-hover:from-green-500/40 group-hover:via-emerald-400/20 transition-all duration-500" />
              
//               {/* Geometric Core Border Ring */}
//               <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-green-400/40 transition-colors duration-500 pointer-events-none z-20" />
              
//               {/* Inner Round Mask Canvas */}
//               <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-900/90 flex items-center justify-center z-10 shadow-inner">
//                 <img
//                   src="/photo.PNG" 
//                   alt="Anveshan John Parichha Profile"
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                   onError={(e) => {
//                     e.currentTarget.style.display = 'none';
//                   }}
//                 />
                
                
//               </div>
//             </div>
//           </div>

//         </div>

//         {/* Bottom bar */}
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
//           <div className="flex items-center gap-6">
//             {SOCIALS.map((s) => (
//               <a
//                 key={s.name}
//                 href={s.url}
//                 target={s.url.startsWith("http") || s.url.startsWith("https") ? "_blank" : undefined}
//                 rel="noopener noreferrer"
//                 className="text-sm text-muted hover:text-text-primary transition-colors duration-200"
//               >
//                 {s.name}
//               </a>
//             ))}
//           </div>

//           <div className="flex items-center gap-2">
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
//             </span>
//             <span className="text-sm text-muted">Available for Scale</span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHlsVideo } from "../hooks/useHlsVideo";

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    category: "Languages & Frameworks",
    skills: ["React.js", "Angular.js", "Next.js", "Java", "Python", "JavaScript"]
  },
  {
    category: "Backend & Architecture",
    skills: ["Node.js", "Microservices", "RESTful APIs", "Express.js"]
  },
  {
    category: "Databases & Caching",
    skills: ["PostgreSQL", "MongoDB", "Redis Caching", "SQL Server"]
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS (EC2, S3, IAM)", "Google Cloud Platform (GCP)", "CI/CD Fundamentals"]
  }
];

const SOCIALS = [
  { name: "LinkedIn", url: "https://linkedin.com/in/anveshan-parichha-862b2a363" },
  { name: "GitHub", url: "https://github.com/Anveshan2002" }
];

interface SparkParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  decay: number;
  color: string;
}

export default function Footer() {
  const videoRef = useHlsVideo();
  const footerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll(".skill-card");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          end: "bottom 90%",
          scrub: 1.5,
        }
      });

      cards.forEach((card) => {
        const header = card.querySelector("h4");
        const badges = card.querySelectorAll(".skill-badge");

        tl.fromTo(card,
          {
            filter: "blur(25px)",
            opacity: 0,
            y: 40,
            scale: 0.95,
            backgroundColor: "rgba(24, 24, 27, 0)"
          },
          {
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
            scale: 1,
            backgroundColor: "rgba(39, 39, 42, 0.2)",
            duration: 1.5,
            ease: "power2.out"
          },
          0
        );

        if (header) {
          tl.fromTo(header,
            { filter: "blur(10px)", letterSpacing: "0.3em", opacity: 0 },
            { filter: "blur(0px)", letterSpacing: "0.15em", opacity: 1, duration: 1.2 },
            0.2
          );
        }

        if (badges.length > 0) {
          tl.fromTo(badges,
            {
              filter: "blur(12px)",
              opacity: 0,
              y: 15,
              scale: 0.8
            },
            {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.08,
              duration: 1,
              ease: "power3.out"
            },
            0.3
          );
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let sparks: SparkParticle[] = [];
    const mouse = { x: -1000, y: -1000, radius: 120 };

    const resizeCanvas = () => {
      if (canvas && footerRef.current) {
        canvas.width = footerRef.current.offsetWidth;
        canvas.height = footerRef.current.offsetHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createSpark = (x: number, y: number, isBurst = false): SparkParticle => {
      const colors = ["#ffffff", "#a3a3a3", "#22c55e", "#4ade80", "#18181b"];
      return {
        x,
        y,
        size: Math.random() * (isBurst ? 3.5 : 2) + 0.5,
        speedX: (Math.random() - 0.5) * (isBurst ? 4 : 1.2),
        speedY: -Math.random() * (isBurst ? 4 : 1.5) - 0.5,
        opacity: Math.random() * 0.6 + 0.4,
        decay: Math.random() * 0.005 + 0.002,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    const triggerDisintegrationBurst = () => {
      if (!canvas) return;
      const count = 120;
      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = canvas.height - Math.random() * 80;
        sparks.push(createSpark(x, y, true));
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top 80%",
      onEnter: () => {
        triggerDisintegrationBurst();
      },
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (sparks.length < 200 && Math.random() < 0.3) {
        sparks.push(createSpark(Math.random() * canvas.width, canvas.height + 10));
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.008) * 0.15;
        p.opacity -= p.decay;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 3;
          p.y += Math.sin(angle) * force * 3;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.opacity <= 0 || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          sparks.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const footerElement = footerRef.current;
    if (footerElement) {
      footerElement.addEventListener("mousemove", handleMouseMove);
      footerElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      trigger.kill();
      if (footerElement) {
        footerElement.removeEventListener("mousemove", handleMouseMove);
        footerElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <footer
      id="skills"
      ref={footerRef}
      className="relative pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden bg-bg"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none mix-blend-screen"
      />

      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/90" />
      </div>

      <div className="relative z-20 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Section Header */}
        <div className="mb-10 flex items-center gap-3">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">
            Technical Stack
          </span>
        </div>

        {/* Categorized Skills Grid */}
        <div ref={cardsRef} className="relative mb-20 md:mb-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="skill-card p-6 rounded-2xl bg-surface/20 border border-stroke/40 backdrop-blur-md hover:border-text-primary/40 hover:bg-surface/30 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute -inset-px bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <h4 className="text-xs font-mono text-muted uppercase tracking-[0.15em] mb-4 group-hover:text-text-primary transition-colors">
                  {cat.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-badge text-xs font-medium text-text-primary bg-bg/50 border border-stroke/30 px-3 py-1.5 rounded-lg hover:bg-text-primary hover:text-bg transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dual Column Contact Zone - Harmonized Layout Alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 md:mb-24 border-b border-stroke/20 pb-16">
          
          {/* Left Column: Cleanly Centered Interaction Target Items */}
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-xs text-muted uppercase tracking-[0.3em] mb-6 font-mono">
              Initiate Connection
            </span>

            {/* Gmail Web Redirect Link */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=anveshanjohn004@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-full p-[2px] mb-4 inline-block shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            >
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 accent-gradient transition-opacity duration-300"
                style={{ backgroundSize: "200% 200%" }}
              />
              <span className="relative flex items-center gap-2 bg-bg border border-stroke group-hover:border-transparent rounded-full px-8 py-4 text-base sm:text-lg md:text-xl font-display italic text-text-primary tracking-wide transition-all">
                anveshanjohn004@gmail.com <span aria-hidden>↗</span>
              </span>
            </a>

            {/* Centered Clickable Phone Link */}
            <a
              href="tel:+919321788606"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-mono text-muted tracking-wider hover:text-text-primary transition-colors duration-200 mt-1"
            >
              +91 9321788606
            </a>
          </div>

          {/* Right Column: Premium Geometrically Perfect Circular Avatar Rim */}
          <div className="flex justify-center items-center">
            <div className="relative group w-48 h-48 sm:w-56 sm:h-56 rounded-full p-[2px] transition-all duration-500 hover:scale-[1.03]">
              
              {/* Ultra-Smooth High-Contrast Outer Ambient Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-500/20 via-emerald-400/10 to-transparent blur-md group-hover:from-green-500/40 group-hover:via-emerald-400/20 transition-all duration-500" />
              
              {/* Geometric Core Border Ring */}
              <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-green-400/40 transition-colors duration-500 pointer-events-none z-20" />
              
              {/* Inner Round Mask Canvas */}
              <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-900/90 flex items-center justify-center z-10 shadow-inner">
                <img
                  src="./photo.PNG" 
                  alt="Anveshan John Parichha Profile"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                
                {/* Fixed Clean Fallback Monogram Typography Backdrop */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center font-display italic text-4xl sm:text-5xl text-text-primary tracking-tighter select-none bg-zinc-900/40">
                  
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
          <div className="flex items-center gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target={s.url.startsWith("http") || s.url.startsWith("https") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-text-primary transition-colors duration-200"
              >
                {s.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm text-muted">Available for Scale</span>
          </div>
        </div>
      </div>
    </footer>
  );
}