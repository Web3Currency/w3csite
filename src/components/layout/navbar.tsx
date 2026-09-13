import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navigation } from "@/config/navigation";
import { branding } from "@/config/branding";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    if (isOpen) {
      document.body.style.overflow = "auto";
    }
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "auto";
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
          scrolled || isOpen
            ? "bg-black/80 backdrop-blur-xl border-white/10 py-4" 
            : "bg-transparent border-transparent py-6"
        )}
      >
        <div className="container max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group z-50 relative rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black">
            <img 
              src="https://i.imugur.com/FwLZZ8d.png" 
              alt={branding.businessName} 
              className="h-10 sm:h-12 w-auto min-w-[40px] max-w-[160px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display font-bold text-xl tracking-tight text-white hidden sm:block">
              {branding.businessName.replace("W3C ", "")}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.headerLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black px-2 py-1",
                  location === link.href ? "text-white" : "text-white/60"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/contact" 
              className="text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              style={{ backgroundColor: "#22c55e" }}
            >
              {navigation.ctaText}
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 -mr-2 text-white z-50 relative flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden h-[100dvh]"
          >
            <nav className="flex flex-col items-center gap-8 w-full px-6">
              {navigation.headerLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link 
                    href={link.href}
                    className={cn(
                      "text-3xl font-display font-bold transition-colors block p-2",
                      location === link.href ? "text-primary" : "text-white hover:text-white/80"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navigation.headerLinks.length * 0.05 }}
                className="w-full max-w-[200px] mt-4"
              >
                <Link 
                  href="/contact" 
                  className="text-white w-full py-4 rounded-full text-lg font-bold flex items-center justify-center transition-all"
                  style={{ backgroundColor: "#22c55e" }}
                >
                  {navigation.ctaText}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
