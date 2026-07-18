import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mapped precisely to match the exact element IDs used in your section files
const LINKS = [
  { name: "Home", id: "home" },
  { name: "Projects", id: "projects" },        // Matches SelectedWorks.tsx
  { name: "Experience", id: "experience" },  // Matches Journal.tsx
  { name: "Skills", id: "skills" }        // Matches Footer.tsx
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Ref locks to handle scroll state behaviors cleanly
  const isScrollingToRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // 1. Handle background blur toggle on scroll
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);

    // 2. Automatically update active link based on section visibility in viewport
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px", // Focuses on the middle-upper active area of the viewport
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isScrollingToRef.current) {
          setActive(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    LINKS.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    // 3. Close console dropdown dynamically if clicking outside the wrapper element
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setConsoleOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      observer.disconnect();
    };
  }, []);

  // Smooth scroll handler with temporary lock to prevent active tab flicker on passage
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement) {
      isScrollingToRef.current = id;
      setActive(id);
      targetElement.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
      setTimeout(() => { isScrollingToRef.current = null; }, 800);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("+919321788606");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 relative ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
      >
        {/* Logo Monogram adjusted for AJP */}
        <a
          href="#home"
          onClick={(e) => handleScrollTo(e, "home")}
          className="group relative w-9 h-9 rounded-full p-[1.5px] accent-gradient shrink-0 transition-transform duration-300 hover:scale-110"
        >
          <span className="flex items-center justify-center w-full h-full rounded-full bg-bg">
            <span className="font-display font-bold text-[12px] tracking-wider text-text-primary">
              AJP
            </span>
          </span>
        </a>

        <div className="hidden sm:block w-px h-5 bg-stroke mx-2" />

        {/* Fully Functional Navigation links linking to specific component section targets */}
        <div className="flex items-center gap-1 relative">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleScrollTo(e, link.id)}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300 text-center decoration-transparent ${
                active === link.id
                  ? "text-text-primary bg-stroke/60 font-medium"
                  : "text-muted hover:text-text-primary hover:bg-stroke/30"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="w-px h-5 bg-stroke mx-2" />

        {/* Dynamic Status Console Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setConsoleOpen(!consoleOpen)}
            className="group relative rounded-full p-[2px] block outline-none"
          >
            <span className={`absolute inset-0 rounded-full accent-gradient transition-opacity duration-300 ${consoleOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
            <span className="relative flex items-center gap-1.5 bg-surface rounded-full text-xs sm:text-sm px-4 py-1.5 sm:py-2 text-text-primary">
              Connect 
              <motion.span 
                animate={{ rotate: consoleOpen ? 180 : 0 }}
                className="inline-block origin-center font-mono text-[10px]"
              >
                ▼
              </motion.span>
            </span>
          </button>

          {/* Console Dropdown Panel */}
          <AnimatePresence>
            {consoleOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-3 w-64 bg-bg/95 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl z-[60] flex flex-col gap-3.5"
              >
                {/* Live Status Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted">Status Console</span>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <span className="text-[11px] font-medium text-text-primary">Online for Scale</span>
                  </div>
                </div>

                {/* Direct Mail Web Redirect Route */}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=anveshanjohn004@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface/40 border border-white/5 hover:border-green-400/30 hover:bg-surface/80 transition-all text-xs text-text-primary group/item"
                >
                  <span className="font-medium">Launch Direct Email</span>
                  <span className="text-muted group-hover/item:translate-x-0.5 transition-transform">↗</span>
                </a>

                {/* Copy Phone Line */}
                <button
                  onClick={copyToClipboard}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface/40 border border-white/5 hover:border-green-400/30 hover:bg-surface/80 transition-all text-xs text-text-primary text-left"
                >
                  <span className="font-medium">Secure Call Line</span>
                  <span className="text-[10px] font-mono text-muted bg-bg px-1.5 py-0.5 rounded border border-white/5">
                    {copied ? "Copied!" : "Copy"}
                  </span>
                </button>

                {/* Instant Chat Endpoint */}
                <a
                  href="https://wa.me/919321788606"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface/40 border border-white/5 hover:border-green-400/30 hover:bg-surface/80 transition-all text-xs text-text-primary group/item"
                >
                  <span className="font-medium">Instant Secure Chat</span>
                  <span className="text-muted font-mono text-[10px]">WhatsApp</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}