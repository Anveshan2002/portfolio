import { motion } from "framer-motion";

const PROJECTS = [
  {
    title: "Lodha Stella",
    subtitle: "Site Management Application",
    tech: ["Cross-platform", "Real-time Sync", "Process Digitization"],
    // Modern high-rise architectural development scene representing construction scale
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop",
    span: "md:col-span-7",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
  },
  {
    title: "Houzing Partner",
    subtitle: "Admin Panel System",
    tech: ["React.js", "REST API", "RBAC / Dashboards"],
    // Sleek minimalist data workspace representing application admin control panels
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    span: "md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-[4/5]",
  },
  {
    title: "Vibration Monitoring",
    subtitle: "IoT Real-time Alert System",
    tech: ["Flutter", "Java", "Anomaly Detection"],
    // Heavy machinery and automated industrial manufacturing processes
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
    span: "md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-[4/5]",
  },
  {
    title: "Blogger & Banking Hub",
    subtitle: "Dynamic Platform Deployment",
    tech: ["Next.js", "MongoDB", "PHP Secure Auth"],
    // Dynamic abstract server infrastructure / coding monitor aesthetic
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    span: "md:col-span-7",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
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

export default function SelectedWorks() {
  return (
    <section id="projects" className="bg-bg py-12 md:py-16">
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
                Production Record
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary">
              Featured <span className="italic">projects</span>
            </h2>
            <p className="text-sm md:text-base text-muted mt-4 max-w-md">
              A selection of engineering applications I've developed, from full-stack architecture to deployment.
            </p>
          </div>

          <a
            href="#projects"
            className="hidden md:inline-flex group relative rounded-full p-[2px] shrink-0"
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 accent-gradient transition-opacity duration-300"
              style={{ backgroundSize: "200% 200%" }}
            />
            <span className="relative flex items-center gap-2 bg-bg border border-stroke group-hover:border-transparent rounded-full px-5 py-2.5 text-sm text-text-primary">
              View all work <span aria-hidden>↗</span>
            </span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((p) => (
            <motion.div
              key={p.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-3xl bg-surface border border-stroke ${p.span} ${p.aspect}`}
            >
              <img
                src={p.img}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              />
              
              {/* Context text overlay before hover */}
              <div className="absolute top-6 left-6 z-10 bg-bg/60 backdrop-blur-md px-4 py-3 rounded-2xl border border-stroke/40 pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">{p.title}</h3>
                <p className="text-[11px] text-muted mb-2">{p.subtitle}</p>
                <div className="flex flex-wrap gap-1">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[9px] font-mono text-text-primary bg-surface border border-stroke/60 px-1.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Overlay Box */}
              <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-all duration-500 flex items-center justify-center p-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="relative rounded-full p-[1.5px] accent-gradient mb-3">
                    <span className="block bg-white text-black rounded-full px-6 py-2.5 text-sm font-medium">
                      View — <span className="font-display italic">{p.title}</span>
                    </span>
                  </div>
                  <p className="text-xs text-muted max-w-xs">{p.subtitle}</p>
                  <div className="flex flex-wrap gap-1 justify-center mt-3">
                    {p.tech.map((t) => (
                      <span key={t} className="text-[10px] font-mono bg-stroke/30 text-text-primary px-2 py-0.5 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}                     