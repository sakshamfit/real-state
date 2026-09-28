"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = ["Home", "About", "Portfolio", "Services", "Contact"];

const SOCIALS = [
  {
    label: "Facebook",
    icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />,
  },
  {
    label: "Instagram",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    label: "X",
    icon: (
      <path d="M4 4l16 16M4 20L20 4" />
    ),
  },
];

export function Navigation() {
  const [active,   setActive]   = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const handleNavClick = useCallback((item: string) => {
    setActive(item);
    setMenuOpen(false);
  }, []);

  // ── Lock page scroll while the mobile menu is open ─────────────────────────
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  // ── Close on Escape ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  // ── Close the drawer if the viewport grows to desktop ─────────────────────
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      aria-label="Site header"
    >
      <div className="relative flex items-center justify-between px-5 md:px-8 pt-5 md:pt-6">

        {/* ── Left: Logo mark ── */}
        <Link
          href="/"
          aria-label="Meridian Development Group"
          className="pointer-events-auto flex-shrink-0 z-10 group"
        >
          <div
            className="glass-dark w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105"
          >
            <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
              <path
                d="M1 15V1L9 10L17 1V15"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>

        {/* ── Centre: glass pill nav — desktop only, truly centred ── */}
        <div
          className="glass-dark pointer-events-auto absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-0.5 p-1.5 rounded-full"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className="relative px-4 py-[7px] rounded-full text-[12px] font-sans font-medium cursor-pointer transition-colors duration-200 whitespace-nowrap"
              style={{
                color: active === item ? "#111110" : "rgba(255,255,255,0.75)",
                letterSpacing: "0.025em",
              }}
            >
              {/* Sliding white active indicator */}
              {active === item && (
                <motion.span
                  layoutId="active-nav"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.96)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,1)",
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <span className="relative z-10">{item}</span>
            </button>
          ))}
        </div>

        {/* ── Right: socials + CTA + burger ── */}
        <div className="pointer-events-auto flex items-center gap-2.5 z-10">

          {/* Social icon circles */}
          <div className="hidden md:flex items-center gap-2">
            {SOCIALS.map(({ label, icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="glass-dark w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.80)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icon}
                </svg>
              </a>
            ))}
          </div>

          {/* Consultation CTA */}
          <motion.a
            href="#"
            className="glass-white flex items-center gap-2.5 pl-4 sm:pl-5 pr-1.5 py-1.5 rounded-full text-[12px] font-sans font-semibold text-charcoal whitespace-nowrap"
            style={{ letterSpacing: "0.03em" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            Consultation
            {/* Arrow badge */}
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0"
              style={{
                background: "#111110",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              ↗
            </span>
          </motion.a>

          {/* Burger — mobile / tablet only */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="glass-dark w-10 h-10 rounded-xl flex items-center justify-center lg:hidden transition-transform duration-300 active:scale-95"
          >
            <div className="flex flex-col items-center justify-center gap-[5px]">
              <span
                className={`block h-[1.5px] w-[18px] rounded-full bg-white/90 transition-transform duration-300 ${
                  menuOpen ? "translate-y-[3.25px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-[18px] rounded-full bg-white/90 transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[3.25px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>

        </div>
      </div>

      {/* ── Mobile menu overlay (backdrop + slide-in drawer) ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu-backdrop"
            className="fixed inset-0 z-[90] pointer-events-auto lg:hidden"
            style={{ background: "rgba(10,10,9,0.55)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeMenu}
            aria-hidden
          />
        )}
        {menuOpen && (
          <motion.div
            key="menu-drawer"
            id="mobile-menu"
            className="fixed inset-y-0 right-0 z-[95] w-[86vw] max-w-sm pointer-events-auto lg:hidden flex flex-col"
            style={{
              background: "rgba(22,22,20,0.97)",
              borderLeft: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "-24px 0 60px rgba(0,0,0,0.45)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-5">
                <p
                  className="font-serif text-white/90 text-[13px]"
                  style={{ letterSpacing: "0.28em" }}
                >
                  MERIDIAN
                </p>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="glass-dark w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-transform"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4l16 16M4 20L20 4" />
                  </svg>
                </button>
              </div>

              <div className="h-px mx-6" style={{ background: "rgba(255,255,255,0.10)" }} />

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto px-6 py-8" data-lenis-prevent>
                <ul className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.45, ease: "easeOut" }}
                    >
                      <button
                        type="button"
                        onClick={() => handleNavClick(item)}
                        className="w-full text-left flex items-baseline gap-4 py-2.5 group"
                      >
                        <span
                          className="font-sans text-[10px] tabular-nums"
                          style={{
                            letterSpacing: "0.22em",
                            color: active === item ? "#c9a96e" : "rgba(255,255,255,0.30)",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="font-serif text-[1.75rem] leading-tight transition-colors duration-200"
                          style={{
                            color: active === item ? "#c9a96e" : "rgba(255,255,255,0.88)",
                          }}
                        >
                          {item}
                        </span>
                        <span
                          className="ml-auto text-white/30 text-sm transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden
                        >
                          ↗
                        </span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Drawer footer: socials + CTA */}
              <div
                className="px-6 pt-5 pb-8 flex flex-col gap-5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}
              >
                <div className="flex items-center gap-2.5">
                  {SOCIALS.map(({ label, icon }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="glass-dark w-10 h-10 flex items-center justify-center rounded-full active:scale-95 transition-transform"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(255,255,255,0.80)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {icon}
                      </svg>
                    </a>
                  ))}
                </div>

                <motion.a
                  href="#"
                  onClick={closeMenu}
                  className="glass-white flex items-center justify-between gap-2.5 pl-5 pr-1.5 py-1.5 rounded-full text-[12px] font-sans font-semibold text-charcoal"
                  style={{ letterSpacing: "0.03em" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Book a Consultation
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0"
                    style={{ background: "#111110" }}
                  >
                    ↗
                  </span>
                </motion.a>

                <p
                  className="font-sans text-white/30 text-[9px] uppercase text-center"
                  style={{ letterSpacing: "0.26em" }}
                >
                  Meridian Development Group — Est. 1998
                </p>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
