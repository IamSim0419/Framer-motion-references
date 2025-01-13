"use client";

import { motion } from "framer-motion";
import { createContext, useContext, useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

// Define context type
type ThemeContextType =  {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

//* Create context
const ThemeContext = createContext<ThemeContextType | null>(null);

//! Custom hook
export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    
    return context;
}

//* Provider component
import { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Toggle between dark and light mode
    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

//* Toggle component
export default function ThemeToggle() {
    const { isDarkMode, toggleTheme } = useTheme();

    // Update the data-theme attribute on the root element when the theme changes
    useEffect(() => {
        document.documentElement.setAttribute(
          "data-theme",
          isDarkMode ? "dark" : "light"
        );
    }, [isDarkMode]);

return (
    <div className="p-4">
        <motion.button
            onClick={toggleTheme}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}            
            className={twMerge("w-16 h-8 flex items-center px-1 rounded-full", isDarkMode ? "bg-gray-600 justify-end" : "bg-gray-200 justify-start")}

    >
            <motion.div
                    className="w-6 h-6 rounded-full bg-slate-100 shadow-md flex items-center justify-center"
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30}}
            >
                    {isDarkMode ? (
                            <motion.div
                                    transition={{ duration: 0.5 }}
                            >
                                    <FaMoon className="text-slate-900/80" />
                            </motion.div>
                    ) : (
                            <motion.div
                                    key="sun"
                                    transition={{ duration: 0.5 }}
                            >
                                    <FaSun className="text-yellow-500" />
                            </motion.div>
                    )}
            </motion.div>
    </motion.button>
    </div>
    
)
}
