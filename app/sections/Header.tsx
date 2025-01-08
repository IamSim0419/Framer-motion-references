"use client";

import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../components/ThemeToggle";
import { useEffect } from "react";

export default function Header() {
    const { isDarkMode } = useTheme();
    
      useEffect(() => {
        document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
      }, [isDarkMode]);
    
  return (
    <div>
        <ThemeToggle />
    </div>
  )
}
