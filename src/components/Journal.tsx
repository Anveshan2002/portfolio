

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";


const TIMELINE_ENTRIES = [
  {
    role: "Software Engineer",
    company: "Darpin Dynamics Pvt. Ltd.",
    course: "Full Stack & Cloud Architecture Execution",
    img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=300&auto=format&fit=crop",
    location: "Navi Mumbai, IN",
    date: "May 2025 - Present",
    color: "from-emerald-500/20 to-teal-500/0", // Engineering Green
  },
  {
    role: "AWS Cloud Practitioner Intern",
    company: "Magic Bus India Foundation",
    course: "Cloud Infrastructure Monitoring & Cost Tuning",
    img: "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?q=80&w=300&auto=format&fit=crop",
    location: "Navi Mumbai, IN",
    date: "Mar 2024 - Jun 2024",
    color: "from-sky-500/20 to-blue-500/0", // AWS Sky Blue
  },
  {
    role: "MSc - Information Technology",
    company: "DG Ruparel College",
    course: "Postgraduation",
    img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=300&auto=format&fit=crop",
    location: "Dadar, Mumbai",
    date: "2023 - 2025",
    color: "from-purple-500/20 to-pink-500/0", // Academic Purple
  },
  {
    role: "BSc - Information Technology (9.00 CGPA Focus)",
    company: "Jnan Vikas Mehta College",
    course: "Undergraduation",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=300&auto=format&fit=crop",
    location: "Airoli, Navi Mumbai",
    date: "2020 - 2023",
    color: "from-indigo-500/20 to-violet-500/0", // Core Indigo
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

// Interactive Hover Card Wrapper Component
function TimelineCard({ entry }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      className="group relative flex items-center gap-4 sm:gap-6 p-4 rounded-[32px] sm:rounded-full bg-surface/30 border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/20"
    >
      {/* Dynamic Radial Highlight Gradient that follows the mouse position */}
      <motion.div
        className={`absolute -inset-px rounded-[32px] sm:rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r ${entry.color}`}
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.06),
              transparent 80%
            )
          `,
        }}
      />

      <img
        src={entry.img}
        alt=""
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500 border border-stroke/50 group-hover:scale-105 z-10"
      />
      
      <div className="flex-1 min-w-0 z-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
          <h3 className="text-sm sm:text-base md:text-lg text-text-primary font-medium truncate group-hover:text-white transition-colors">
            {entry.role}
          </h3>
          <span className="hidden sm:inline text-muted/40">•</span>
          <span className="text-xs sm:text-sm text-muted font-normal truncate">
            {entry.company}
          </span>
        </div>
        <p className="text-[11px] sm:text-xs text-muted/70 truncate mt-0.5 font-mono">
          {entry.course}
        </p>
      </div>

      <div className="flex flex-col items-end shrink-0 pr-2 sm:pr-4 text-right z-10">
        <span className="text-[11px] sm:text-xs text-text-primary font-mono font-medium">
          {entry.date}
        </span>
        <span className="text-[10px] sm:text-xs text-muted">
          {entry.location}
        </span>
      </div>
    </motion.div>
  );
}

export default function Journal() {
  return (
    <section id="experience" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="flex items-end justify-between mb-10 md:mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                Timeline
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary">
              Professional <span className="italic">history</span>
            </h2>
            <p className="text-sm md:text-base text-muted mt-4 max-w-md">
              A chronological overview of my industry software engineering roles and academic background.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4">
          {TIMELINE_ENTRIES.map((entry) => (
            <TimelineCard key={entry.role + entry.company} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}