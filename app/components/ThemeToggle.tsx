"use client";

import { motion } from "framer-motion";
import { createContext, useContext, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

// Define context type
type ThemeContextType =  {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

// Create context
const ThemeContext = createContext<ThemeContextType | null>(null);

// Custom hook
export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    
    return context;
}

// Provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
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

//* ThemeProvider component
export default function ThemeToggle() {
    const { isDarkMode, toggleTheme } = useTheme();

return (
    <div className="p-4">
        <motion.button
            onClick={toggleTheme}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}            
            className={twMerge("w-16 h-8 flex items-center px-1 rounded-full", isDarkMode ? "bg-gray-600" : "bg-gray-200")}

    >
            <motion.div
                    className="w-6 h-6 rounded-full bg-slate-100 shadow-md flex items-center justify-center"
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30}}
                    style={{ x: isDarkMode ? 32 : 1 }} // Toggle left and right
            >
                    {isDarkMode ? (
                            <motion.div
                                    key="moon"
                                    // initial={{ rotate: 0 }}
                                    // animate={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                            >
                                    <FaMoon className="text-slate-900/80" />
                            </motion.div>
                    ) : (
                            <motion.div
                                    key="sun"
                                    // initial={{ rotate: 0 }}
                                    // animate={{ rotate: 360 }}
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
