"use client";

import { AnimatePresence } from "motion/react";
import { DropDown } from "../components/Dropdown";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../components/ThemeToggle";
import { useEffect, useState } from "react";

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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header>
      <div className=" bg-lime-950 text-white py-4 px-8 shadow-lg">
        <div className="container m-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dropdown</h1>

          {/* Navigation */}
          <nav className=" hidden md:block">
            <div className="flex items-center gap-x-8">
              {navLinks.map((link) => (
                <div
                  className="relative"
                  key={link.label}
                  onMouseEnter={() =>
                    setActiveDropdown(link.dropdown ? link.label : null)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={link.href}
                    className="cursor-pointer hover:text-gray-400"
                  >
                    {link.label}
                  </a>
                  {link.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <DropDown dropdownlinks={link.dropdown} />
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}

              <div>
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
