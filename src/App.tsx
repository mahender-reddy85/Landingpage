import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useSpring 
} from "motion/react";
import { 
  Search, 
  ArrowRight, 
  DollarSign, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  Globe2, 
  CreditCard, 
  ChevronDown, 
  Plus, 
  Minus,
  Check,
  X,
  Menu,
  ExternalLink,
  Sun,
  Moon
} from "lucide-react";

// --- Components ---

const GeometricSphere = ({ size, className, translateZ }: { size: number, className?: string, translateZ: number }) => (
  <motion.div
    className={`rounded-full absolute ${className} mix-blend-screen opacity-20`}
    style={{ 
      width: size, 
      height: size, 
      translateZ,
      background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(0,209,102,0.2))",
      backdropFilter: "blur(4px)",
      boxShadow: "inset -10px -10px 20px rgba(0,0,0,0.2), 0 20px 40px rgba(0,0,0,0.1)"
    }}
    animate={{ 
      y: [0, -60, 0],
      rotate: [0, 360],
      scale: [1, 1.15, 1],
      opacity: [0.15, 0.25, 0.15]
    }}
    transition={{ 
      duration: 15 + Math.random() * 10, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  />
);

const GeometricCube = ({ size, className, translateZ }: { size: number, className?: string, translateZ: number }) => (
  <motion.div
    className={`absolute ${className} mix-blend-screen opacity-20`}
    style={{ 
      width: size, 
      height: size, 
      translateZ,
      transformStyle: "preserve-3d"
    }}
    animate={{ 
      rotateX: [0, 360],
      rotateY: [0, 360],
      y: [0, 80, 0],
      opacity: [0.1, 0.2, 0.1]
    }}
    transition={{ 
      duration: 20 + Math.random() * 10, 
      repeat: Infinity, 
      ease: "linear" 
    }}
  >
    {[...Array(6)].map((_, i) => (
      <div 
        key={i}
        className="absolute inset-0 border border-brand/30 bg-brand/5 backdrop-blur-[2px]"
        style={{
          transform: `rotate${i < 4 ? 'Y' : 'X'}(${(i % 4) * 90}deg) translateZ(${size / 2}px)`
        }}
      />
    ))}
  </motion.div>
);

const GeometricPyramid = ({ size, className, translateZ }: { size: number, className?: string, translateZ: number }) => (
  <motion.div
    className={`absolute ${className} mix-blend-screen opacity-20`}
    style={{ 
      width: size, 
      height: size, 
      translateZ,
      transformStyle: "preserve-3d"
    }}
    animate={{ 
      rotateY: [0, 360],
      rotateX: [15, -15, 15],
      y: [0, -50, 0],
      opacity: [0.15, 0.25, 0.15]
    }}
    transition={{ 
      duration: 18, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    {[...Array(4)].map((_, i) => (
      <div 
        key={i}
        className="absolute bottom-0 left-0 border-l-[transparent] border-r-[transparent] border-b-brand/20 backdrop-blur-[2px]"
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: size / 2,
          borderRightWidth: size / 2,
          borderBottomWidth: size,
          transformOrigin: "50% 100%",
          transform: `rotateY(${i * 90}deg) rotateX(30deg)`
        }}
      />
    ))}
  </motion.div>
);

const CTAButton = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.button 
      className={`relative overflow-hidden group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="absolute inset-0 bg-brand/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
        animate={{ 
          scale: [1, 1.5, 1],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        animate={{
          x: ["-100%", "200%"]
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear"
        }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

const Navbar = ({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-surface/90 backdrop-blur-xl border-b border-gray py-4" : "bg-transparent py-8"}`}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex items-center">
          {/* Logo - Left */}
          <div className="flex-1">
            <a href="/" className="text-2xl font-display font-[800] tracking-tighter inline-flex items-center gap-2">
              The Crumb
            </a>
          </div>

          {/* Desktop Links - Center */}
          <div className="hidden lg:flex flex-none items-center gap-10 text-[13px] font-bold uppercase tracking-widest opacity-70">
            <a href="#features" className="hover:text-brand hover:opacity-100 transition-all">Features</a>
            <a href="#earnings" className="hover:text-brand hover:opacity-100 transition-all">Earnings</a>
            <a href="#analytics" className="hover:text-brand hover:opacity-100 transition-all">Analytics</a>
            <a href="#faq" className="hover:text-brand hover:opacity-100 transition-all">FAQ</a>
          </div>

          {/* Actions - Right */}
          <div className="flex-1 flex items-center justify-end gap-3">
            <button 
              onClick={toggleDarkMode}
              className="p-3 rounded-xl border border-gray hover:bg-gray transition-colors flex items-center justify-center"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="hidden sm:flex items-center gap-3">
              <button className="text-sm font-bold px-6 py-3 rounded-xl border border-text hover:bg-text hover:text-surface transition-all duration-300 transform active:scale-95">
                Login
              </button>
              <button className="bg-text text-surface px-6 py-3 rounded-xl text-sm font-bold hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all transform hover:-translate-y-1 active:scale-95 border border-text">
                Get Started
              </button>
            </div>
            {/* Mobile Toggle */}
            <button 
              className="lg:hidden p-3 rounded-xl bg-gray"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[49] bg-surface pt-32 px-10 flex flex-col gap-8 lg:hidden"
          >
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-display font-black tracking-tighter">Features</a>
            <a href="#earnings" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-display font-black tracking-tighter">Earnings</a>
            <a href="#analytics" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-display font-black tracking-tighter">Analytics</a>
            <div className="mt-auto pb-16 flex flex-col gap-4">
              <button className="w-full py-5 rounded-2xl border border-text font-black text-xl">Login</button>
              <button className="w-full py-5 rounded-2xl bg-text text-surface font-black text-xl">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Marquee = () => {
  const items = [
    "Monetize Your Traffic", "Searchable Links", "Full Brand Control", "Zero Monthly Fees", "Instant Payouts",
    "Monetize Your Traffic", "Searchable Links", "Full Brand Control", "Zero Monthly Fees", "Instant Payouts"
  ];

  const { scrollYProgress } = useScroll();
  const bgX = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="bg-[#000000] py-10 overflow-hidden border-y border-gray relative group/marquee">
      {/* Parallax Background Element */}
      <motion.div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: "radial-gradient(var(--color-brand) 1.5px, transparent 0)",
          backgroundSize: "60px 60px",
          x: bgX
        }}
      />
      
      <motion.div 
        className="flex whitespace-nowrap gap-16 relative z-10"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        {items.map((item, idx) => (
          <motion.span 
            key={idx} 
            className="text-white/60 font-display text-xl uppercase tracking-[0.2em] font-black flex items-center gap-12 cursor-pointer transition-all duration-300"
            whileHover={{ 
              scale: 1.15, 
              color: "#ffffff",
              textShadow: "0 0 20px rgba(0, 209, 102, 0.5)"
            }}
          >
            {item} <div className="w-2.5 h-2.5 rounded-full bg-brand shadow-[0_0_10px_rgba(0,209,102,0.8)]" />
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-brand transition-colors group"
      >
        <span className="font-semibold text-lg">{question}</span>
        <div className={`p-1 rounded-full transition-transform duration-300 ${isOpen ? "bg-brand text-white rotate-180" : "bg-gray-50 text-text-muted group-hover:bg-brand-light group-hover:text-brand"}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-text-muted leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true); // Defaulting to dark as per style preference

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  // Scroll Container Ref for Section Tracking (Hero + Features)
  const sceneRef = useRef(null);
  const { scrollYProgress: sectionScroll } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  });

  // Phone Scroll Transformations (Elite Cinematic Journey)
  // Transitioning from Right-Heavy (Hero) to Left-Heavy (Features)
  const phoneX = useTransform(sectionScroll, [0, 0.45], ["0%", "-75%"]);
  const phoneY = useTransform(sectionScroll, [0, 0.45], ["0px", "820px"]);
  const phoneRotateX = useTransform(sectionScroll, [0, 0.1, 0.25, 0.45], [0, 25, -25, 0]);
  const phoneRotateY = useTransform(sectionScroll, [0, 0.45], [0, -1080]); // Triple 3D spin
  const phoneScale = useTransform(sectionScroll, [0, 0.1, 0.35, 0.45], [1, 1.3, 0.9, 0.85]);
  const phoneBlur = useTransform(sectionScroll, [0.15, 0.3, 0.45], [0, 6, 0]);

  // Mouse Tracking for 3D Tilt (only active when not heavily scrolling)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 100, damping: 30 });
  const mRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const combinedRotateX = useTransform([mRotateX, phoneRotateX], ([m, p]) => (m as number) + (p as number));
  const combinedRotateY = useTransform([mRotateY, phoneRotateY], ([m, p]) => (m as number) + (p as number));

  return (
    <div className="min-h-screen selection:bg-brand selection:text-white overflow-x-hidden">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* --- Scroll Animation Scene --- */}
      <div ref={sceneRef} className="relative">
        {/* Sticky Phone Container */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="sticky top-0 h-screen flex items-center justify-end pr-[10%] lg:pr-[15%]">
            <motion.div 
              className="relative w-[300px] h-[650px] flex items-center justify-center pt-20 pointer-events-auto"
              style={{ 
                perspective: 2000, 
                transformStyle: "preserve-3d",
                rotateX: combinedRotateX,
                rotateY: combinedRotateY,
                x: phoneX,
                y: phoneY,
                scale: phoneScale
              }}
            >
              {/* 3D Floating Geometric Objects */}
              <GeometricSphere size={80} className="top-10 left-10" translateZ={300} />
              <GeometricCube size={60} className="bottom-20 right-10" translateZ={250} />
              <GeometricPyramid size={70} className="bottom-40 -left-10" translateZ={180} />
              <GeometricSphere size={40} className="top-1/2 -left-20" translateZ={150} />
              
              {/* 3D Floating Particles / Objects */}
              <motion.div 
                className="absolute top-0 right-0 text-brand opacity-20"
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ translateZ: 150 }}
              >
                <DollarSign size={80} strokeWidth={1} />
              </motion.div>
              <motion.div 
                className="absolute bottom-10 left-0 text-brand-dark opacity-10"
                animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ translateZ: 200 }}
              >
                <BarChart3 size={100} strokeWidth={1} />
              </motion.div>

              {/* Hyper-Advanced 3D Phone with Refined Materials */}
              <motion.div 
                 className="relative w-[300px] h-[600px]"
                 initial={{ opacity: 0, scale: 0.5, rotateY: 90, y: 300 }}
                 animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
                 transition={{ 
                   duration: 1.8, 
                   ease: [0.16, 1, 0.3, 1],
                   delay: 0.4
                 }}
                 style={{ 
                   transformStyle: "preserve-3d",
                   filter: `blur(${phoneBlur}px)`
                 }}
              >
                {/* Stacked rim layers with enhanced metallic sheen */}
                {[...Array(16)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute inset-0 border-[1px] rounded-[52px] pointer-events-none shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]"
                    style={{ 
                      transform: `translateZ(${-i * 1.5}px)`,
                      opacity: 1 - i * 0.04,
                      borderColor: i === 0 ? '#444' : '#111',
                      background: i > 0 ? `linear-gradient(135deg, #0a0a0a 0%, #444 25%, #111 50%, #555 75%, #0a0a0a 100%)` : 'transparent'
                    }}
                  />
                ))}
                
                {/* Back Plate - Deep Gloss Metallic */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-[#0c0c0c] via-[#222] to-[#0c0c0c] rounded-[52px] shadow-2xl"
                  style={{ transform: "translateZ(-24px)" }}
                />

                {/* Screen Emissive Glow Foundation */}
                <motion.div 
                  className="absolute inset-[3px] rounded-[49px] bg-brand/20 blur-2xl z-0"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Screen Content with Bloom & Emissive Qualities */}
                <motion.div 
                  className="absolute inset-0 bg-white rounded-[52px] overflow-hidden flex flex-col z-10 border border-white/5"
                  style={{ 
                    transform: "translateZ(2px)",
                    boxShadow: "0 0 50px rgba(0, 209, 102, 0.15), inset 0 0 30px rgba(0, 209, 102, 0.1)"
                  }}
                >
                  {/* Scanline Effect */}
                  <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 2px, 3px 100%" }} />
                  
                  {/* Digital Glitch Overlay (Occasional) */}
                  <motion.div 
                    className="absolute inset-0 bg-brand/5 z-40 pointer-events-none mix-blend-overlay"
                    animate={{ 
                      opacity: [0, 0.1, 0, 0.2, 0],
                      x: [0, -2, 2, -1, 0]
                    }}
                    transition={{ 
                      duration: 0.2, 
                      repeat: Infinity, 
                      repeatDelay: 5 
                    }}
                  />
                  
                  {/* Visual Content */}
                  <div className="absolute inset-x-0 top-0 h-6 bg-[#1a1a1a] rounded-b-3xl z-40 mx-auto w-32 shadow-lg" />
                  
                  <div className="relative z-10 flex flex-col h-full pt-10 px-6">
                    {/* Internal Bloom Effect Overlay */}
                    <motion.div 
                      className="absolute inset-0 pointer-events-none bg-brand opacity-5 mix-blend-screen overflow-hidden"
                      animate={{ opacity: [0.03, 0.08, 0.03] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    <div className="text-center mb-8 relative">
                      <div className="relative inline-block">
                        <motion.div 
                          className="w-[80px] h-[80px] bg-gray rounded-full mx-auto border-4 border-brand p-1 shadow-[0_0_20px_rgba(0,209,102,0.3)]"
                          animate={{ 
                            scale: [1, 1.05, 1],
                            boxShadow: ["0 0 10px rgba(0,209,102,0.2)", "0 0 25px rgba(0,209,102,0.4)", "0 0 10px rgba(0,209,102,0.2)"]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <img src="https://picsum.photos/seed/crecrumb/100/100" alt="Avatar" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
                        </motion.div>
                      </div>
                      <div className="font-[900] text-lg tracking-tight mt-3 text-text drop-shadow-sm">The Crumb Studio</div>
                      <div className="text-[11px] text-text-muted font-black uppercase tracking-widest opacity-60">Verified Creator</div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-text/5 p-4 rounded-2xl border border-brand/10 mb-2">
                        <div className="flex justify-between items-end mb-3">
                          <div>
                            <div className="text-[9px] font-black opacity-40 uppercase">Live Pulse</div>
                            <div className="text-sm font-[900] tracking-tighter">$1,240.20</div>
                          </div>
                          <div className="text-[10px] text-brand font-bold">+12%</div>
                        </div>
                        <svg viewBox="0 0 100 30" className="w-full h-8 overflow-visible">
                          <motion.path
                            d="M0 25 Q 10 20, 20 22 T 40 15 T 60 18 T 80 5 T 100 10"
                            fill="none"
                            stroke="var(--color-brand)"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                          />
                        </svg>
                      </div>

                      {[
                        { title: "Vlogging Masterclass", sub: "$1,200 Earned", color: "bg-brand/5" },
                        { title: "Amazon Gear List", sub: "420 views", color: "bg-gray" },
                      ].map((link, i) => (
                        <motion.div 
                          key={i}
                          className={`${link.color} p-4 rounded-xl border border-gray-200 text-left relative overflow-hidden`}
                          whileHover={{ x: 5 }}
                        >
                          <div className="font-[800] text-[12px] text-text relative z-10">{link.title}</div>
                          <div className="text-[9px] text-brand font-bold mt-0.5 uppercase relative z-10">{link.sub}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Interaction Simulation: Pop-up Toast */}
                    <AnimatePresence>
                      <motion.div 
                        className="absolute bottom-24 left-6 right-6 bg-text text-surface p-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 border border-brand/30"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatDelay: 4, 
                          duration: 0.5,
                          repeatType: "reverse"
                        }}
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-black">
                          <Zap size={16} fill="currentColor" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase">Instant Payout</div>
                          <div className="text-[12px] font-bold">+$42.50 Received</div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Ads Simulation - Emissive */}
                    <div className="mt-auto mb-6 bg-brand-light/20 border border-brand/20 p-4 rounded-2xl shadow-[0_0_15px_rgba(0,209,102,0.1)]">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Live Ad Stream</span>
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-1 rounded-full bg-brand animate-ping" />
                            <span className="text-[9px] text-brand font-bold">Earned: $0.42</span>
                          </div>
                       </div>
                       <div className="h-10 bg-white/50 rounded-lg animate-pulse shadow-inner" />
                    </div>
                  </div>

                  {/* Metallic Reflection / Glass Swipe */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{ rotate: '25deg', scale: 2 }}
                  />
                </motion.div>
              </motion.div>

              {/* Floating Earnings Glass Hub (Physical 3D) */}
              <motion.div 
                className="absolute -right-16 top-1/4 w-[280px] bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border border-white"
                style={{ transformStyle: "preserve-3d", translateZ: 100 }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ translateZ: 150, rotateY: -10 }}
              >
                <div className="text-[11px] font-black uppercase tracking-[2px] text-text-muted mb-2">Platform Revenue</div>
                <div className="text-4xl font-[900] tracking-tighter text-text mb-4 font-mono">$12,408.00</div>
                <div className="flex gap-2">
                  <span className="bg-brand text-black text-[10px] font-black px-3 py-1 rounded-full">+122.4%</span>
                  <span className="text-[10px] text-text-muted font-bold self-center">vs last month</span>
                </div>
              </motion.div>

              {/* Floating Keyword Badge (Physical 3D) */}
              <motion.div 
                className="absolute -left-20 bottom-1/4 w-[240px] bg-text text-surface rounded-[32px] p-8 shadow-2xl"
                style={{ transformStyle: "preserve-3d", translateZ: 80 }}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ translateZ: 120, rotateY: 10 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-black">
                    <Search size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Trending Keyword</div>
                    <div className="text-lg font-[800]">"Fitness Kit"</div>
                  </div>
                </div>
                <div className="text-[11px] opacity-70 leading-relaxed font-medium">
                  42 creators earned from this keyword in the last 24 hours.
                </div>
              </motion.div>

              {/* Floating Search Result (Physical 3D) */}
              <motion.div 
                className="absolute right-0 bottom-10 w-[200px] bg-white rounded-2xl p-4 shadow-xl border border-gray"
                style={{ transformStyle: "preserve-3d", translateZ: 180 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
                whileHover={{ translateZ: 220, scale: 1.1 }}
              >
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-brand" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">New Result</span>
                </div>
                <div className="text-[12px] font-[800]">Sony Alpha A7 IV</div>
                <div className="text-[10px] text-brand font-bold mt-1">Found via "vlog kit"</div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* --- Hero Section --- */}
        <section 
          className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-16 cursor-default z-10"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <motion.div
              initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 }
              }
            }}
          >
            <motion.div 
              variants={{ 
                hidden: { opacity: 0, y: 30 }, 
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } 
              }}
              className="bg-gray text-text px-3 py-1.5 rounded text-[12px] font-bold uppercase tracking-widest mb-6 inline-block"
            >
              Free Forever — We Pay You
            </motion.div>
            
            <motion.h1 
              variants={{ 
                hidden: { opacity: 0, y: 40 }, 
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } 
              }}
              className="text-6xl md:text-7xl lg:text-[64px] leading-[1.05] tracking-[-2.5px] mb-6"
            >
              The Link-in-Bio That <br />
              <span className="text-brand">Pays You</span>
            </motion.h1>
            
            <motion.p 
              variants={{ 
                hidden: { opacity: 0, y: 30 }, 
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } 
              }}
              className="text-lg text-text-muted max-w-[540px] mb-10 leading-relaxed font-medium"
            >
              Stop burying links in long lists. Give your followers a searchable storefront and earn revenue from every single view.
            </motion.p>
            
            <motion.div 
              variants={{ 
                hidden: { opacity: 0, y: 20 }, 
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } 
              }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <CTAButton className="w-full sm:w-auto bg-text text-surface px-8 py-4 rounded-lg text-lg font-bold shadow-xl">
                Start Earning Now
              </CTAButton>
              <div className="flex flex-col gap-1 items-start pl-2">
                <span className="text-[13px] font-bold">Next Payout: $420.00</span>
                <span className="text-[11px] text-text-muted">Ready in 12 days</span>
              </div>
            </motion.div>
          </motion.div>

          <div className="relative h-[650px] hidden lg:flex items-center justify-center pt-20" />
        </div>
      </section>

      <Marquee />

      {/* --- Intro Section --- */}
      <section id="features" className="py-32 px-16 overflow-hidden relative z-0">
        <div className="max-w-[1440px] mx-auto text-center mb-24">
          <motion.h2 
            className="text-5xl md:text-6xl mb-8 tracking-[-1.5px] font-[800]"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Finally, A Link-in-Bio <br />
            <span className="text-brand">That Works For You</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed font-medium"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We fixed what's broken about traditional link tools – turning your traffic into revenue while making it easier for followers to find what they need.
          </motion.p>
        </div>

        <motion.div 
          className="max-w-[1440px] mx-auto grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {[
            {
              icon: <Search className="text-brand" />,
              title: "Never Lose A Sale To A Buried Link",
              desc: "Followers type what they're looking for - 'podcast gear', 'summer dress' - and instantly find it. No more endless scrolling."
            },
            {
              icon: <BarChart3 className="text-brand" />,
              title: "Smart Insights That Actually Matter",
              desc: "Discover what your audience actually wants. See real-time search data and optimize your content strategy."
            },
            {
              icon: <Zap className="text-brand" />,
              title: "Revenue Engine: Turn Views Into Income",
              desc: "We display premium, relevant ads that don't interrupt. You earn from every visitor - even if they don't click anything."
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              className="group bg-brand-light p-10 rounded-[20px] border border-gray hover:shadow-2xl transition-all duration-500"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <div className="mb-6 w-14 h-14 bg-gray rounded-lg flex items-center justify-center transition-colors group-hover:bg-brand group-hover:text-white">
                {item.icon}
              </div>
              <h3 className="text-2xl mb-4 font-bold tracking-tight">{item.title}</h3>
              <p className="text-text-muted leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>

    {/* --- Analytics Showcase --- */}
      <section id="analytics" className="py-32 bg-gray px-16">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <motion.div 
              className="bg-brand-light p-8 rounded-[20px] shadow-2xl relative border border-gray"
              whileHover={{ scale: 1.02 }}
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-xl font-[800]">Audience Intent</h4>
                <div className="text-xs font-bold text-text-muted">Last 30 Days</div>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: "Camera Gear", value: 68, color: "bg-brand" },
                  { label: "Skincare", value: 42, color: "bg-black" },
                  { label: "Workout Plans", value: 31, color: "bg-brand" }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm tracking-tight">{stat.label}</span>
                      <span className="text-sm font-bold">+{stat.value}%</span>
                    </div>
                    <div className="h-3 w-full bg-gray rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.value}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full ${stat.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-center justify-around border-t border-gray pt-8">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">AVG CTR</p>
                  <p className="text-2xl font-[800] text-brand">3.4%</p>
                </div>
                <div className="w-px h-8 bg-gray" />
                <div className="text-center">
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Impressions</p>
                  <p className="text-2xl font-[800]">12.8k</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-text text-surface px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">
              Granular Data
            </div>
            <h2 className="text-5xl md:text-6xl mb-8 leading-[1.05] tracking-tight font-[800]">
              Analytics that <br />
              Empower You.
            </h2>
            <p className="text-lg text-text-muted mb-10 leading-relaxed font-medium">
              Track every link and every view. Our real-time analytics engine gives you deep context into your impressions, CTR, and top-performing content.
            </p>
            <ul className="space-y-6">
              {[
                { title: "Track Impressions", desc: "Detailed breakdown by device, location, and time of day." },
                { title: "Link Performance", desc: "Conversion tracking for every link in your bio." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded bg-brand text-white flex items-center justify-center mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h5 className="font-[800] text-lg mb-1 tracking-tight">{item.title}</h5>
                    <p className="text-text-muted text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- Earnings Calculator Section --- */}
      <section id="earnings" className="py-32 px-16 bg-surface overflow-hidden">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center">
          <div className="text-center max-w-3xl mb-16">
            <h2 className="text-5xl md:text-7xl mb-8 font-[800] tracking-tight">Your Money, <span className="text-brand">Auto-Mode</span></h2>
            <p className="text-lg text-text-muted leading-relaxed font-medium">
              Every time someone visits your link-in-bio, you earn. No extra work, no special posts needed. Your existing traffic becomes a revenue stream.
            </p>
          </div>

          <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Globe2 size={32} />, title: "Global Scale", desc: "Monetize your audience worldwide." },
              { icon: <Zap size={32} />, title: "99.9% Fill Rate", desc: "Never miss an earning opportunity." },
              { icon: <CreditCard size={32} />, title: "Instant Payouts", desc: "Money directly when you hit $50." },
              { icon: <ShieldCheck size={32} />, title: "Zero Monthly Fees", desc: "Free forever. We earn if you do." }
            ].map((box, i) => (
              <div key={i} className="bg-gray p-8 rounded-[20px] border border-gray transition-all hover:bg-brand hover:text-white group cursor-default">
                <div className="mb-6 transition-colors group-hover:text-white">{box.icon}</div>
                <h4 className="text-lg mb-2 font-[800] tracking-tight">{box.title}</h4>
                <p className="text-xs opacity-70 italic">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Comparison Table --- */}
      <section className="py-32 px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl mb-20 tracking-tighter font-[800]">The Choice Is <span className="text-brand">Simple</span></h2>
          
          <div className="bg-surface rounded-[20px] border border-gray overflow-hidden shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-3 bg-gray font-bold uppercase text-[10px] tracking-widest text-text-muted border-b border-gray">
              <div className="p-6">Feature</div>
              <div className="p-6 text-brand">The Crumb</div>
              <div className="p-6 hidden md:block">Generic Tools</div>
            </div>
            
            {[
              { feature: "Monetized Views", crumb: true, generic: false },
              { feature: "Searchable Links", crumb: true, generic: false },
              { feature: "Setup Time", crumb: "2 Mins", generic: "15 Mins" },
              { feature: "Monthly Cost", crumb: "Free", generic: "$15/mo" },
              { feature: "Advanced Analytics", crumb: "Included", generic: "Pro Only" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2 md:grid-cols-3 border-b border-gray last:border-0 hover:bg-brand/5 transition-colors group">
                <div className="p-6 font-semibold group-hover:text-brand tracking-tight">{row.feature}</div>
                <div className="p-6 font-[800] flex items-center gap-2 text-brand">
                  {typeof row.crumb === "boolean" ? (row.crumb ? <Check size={18} /> : <X size={18} />) : row.crumb}
                </div>
                <div className="p-6 text-text-muted hidden md:flex items-center gap-2 italic">
                   {typeof row.generic === "boolean" ? (row.generic ? <Check size={18} className="text-brand/40" /> : <X size={18} />) : row.generic}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section id="faq" className="py-32 bg-gray px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 tracking-tight font-[800]">Your Questions, <span className="text-brand">Answered</span></h2>
            <p className="text-text-muted font-medium">Everything you need to know about getting started.</p>
          </div>
          <div className="bg-surface p-8 rounded-[20px] border border-gray shadow-2xl">
            <FAQItem 
              question="Do I have control over which ads appear?" 
              answer="Absolutely. You can toggle categories in your dashboard and even block specific brands if they don't align with your aesthetic." 
            />
            <FAQItem 
              question="Will ads annoy my followers?" 
              answer="We use minimal, high-quality display placements that integrate cleanly with your page design. We prioritize user experience above all else." 
            />
            <FAQItem 
              question="How does The Crumb make money?" 
              answer="We take a small percentage from the ad revenue. The tool is free for creators, and we only get paid when you do." 
            />
            <FAQItem 
              question="How quickly do I get paid?" 
              answer="Payouts are processed automatically on the 15th of every month once your balance reaches the $50 threshold." 
            />
          </div>
        </div>
      </section>

      {/* --- Final CTA --- */}
      <section className="py-32 px-16">
        <motion.div 
          className="max-w-[1440px] mx-auto bg-brand p-12 md:p-24 rounded-[40px] text-center text-black relative overflow-hidden flex flex-col items-center shadow-2xl"
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-[64px] mb-8 tracking-tighter font-[800] leading-tight">Ready to Get Paid?</h2>
          <p className="text-xl md:text-2xl mb-12 opacity-80 max-w-2xl mx-auto font-medium">
            Stop leaving money on the table. Join thousands of creators turning their influence into automated income today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <CTAButton className="bg-black text-white px-12 py-5 rounded-lg text-xl font-[800] shadow-2xl">
              Start Earning Now
            </CTAButton>
            <p className="text-sm font-bold opacity-70 flex items-center gap-2">
              <ShieldCheck size={18} /> Free forever - no credit card needed
            </p>
          </div>
        </motion.div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 px-16 border-t border-gray">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-[14px] font-[800]">The Crumb</div>
           <div className="text-[12px] opacity-60">
             © 2026 The Crumb Team • All Rights Reserved
           </div>
        </div>
      </footer>
    </div>
  );
}
