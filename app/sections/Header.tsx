"use client";

import { AnimatePresence, motion } from "motion/react";
import { ThemeSwitcher } from "../components/ThemeToggle";
import { useState } from "react";

type navLinkType = {
  label: string;
  href?: string;
  dropdown?: { label: string; href?: string }[];
};

const navLinks: navLinkType[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Services",
    dropdown: [
      {
        label: "Web Development",
        href: "/webdevelopment",
      },
      {
        label: "App Development",
        href: "/appdevelopment",
      },
      {
        label: "UI/UX design",
        href: "/design",
      },
    ],
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    dropdown: [
      { label: "Support", href: "/support" },
      { label: "Sales", href: "/sales" },
      { label: "Feedback", href: "/feedback" },
    ],
  },
];

export default function Header() {
  return (
    <header>
      <div className="container mx-auto bg-neutral-800 flex justify-between items-center px-2">
        <h1 className="text-white text-4xl font-semibold">Sim</h1>
        <nav className="flex items-center gap-x-4">
          {navLinks.map((link, idx) => (
            <FlyoutLink 
              key={idx} 
              FlyoutContent={PricingContent} 
              href={""}
            >
              {link.label}
            </FlyoutLink>
          ))}
        </nav>

        <ThemeSwitcher />
      </div>
    </header>
  );
}

const FlyoutLink = ({
  children,
  href,
  FlyoutContent,
}: {
  children: React.ReactNode;
  href: string;
  FlyoutContent?: React.ElementType;
}) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <a href={href} className="relative text-white text-sm">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
        />
      </a>
      
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />

            {/* Square shape */}
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-slate-300" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

//! Content Menu
const PricingContent = () => {
  return (
    <div className="w-64 bg-neutral-100 p-6 shadow-xl">
      <div className="mb-3 space-y-3">
        <h3 className="font-semibold">For Individuals</h3>
        <a href="#" className="block text-sm hover:underline">
          Introduction
        </a>
        <a href="#" className="block text-sm hover:underline">
          Pay as you go
        </a>
      </div>
      <div className="mb-6 space-y-3">
        <h3 className="font-semibold">For Companies</h3>
        <a href="#" className="block text-sm hover:underline">
          Startups
        </a>
        <a href="#" className="block text-sm hover:underline">
          SMBs
        </a>
        <a href="#" className="block text-sm hover:underline">
          Enterprise
        </a>
      </div>
      <button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
        Contact sales
      </button>
    </div>
  );
};