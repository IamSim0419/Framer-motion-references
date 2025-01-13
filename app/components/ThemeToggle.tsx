"use client";

import { motion } from "framer-motion";
import { ThemeProvider, useTheme } from "next-themes";
import { useEffect, useState} from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

// Define context type
type ProvidersType =  {
    children: React.ReactNode;
}

//! Theme Provider
export default function Providers({ children }: ProvidersType) {

    return (
        <ThemeProvider >
            {children}
        </ThemeProvider>
    )
}


//* Toggle component
export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    
    if (!mounted) return null;
    
    function handleTheme() {
        if (theme === "light") {
            setTheme("dark")
        } else {
            setTheme("light");
        }
    }

    return (
        <div>
            <motion.button
                onClick={handleTheme}
                // initial={{ scale: 0.9 }}
                // animate={{ scale: 1 }}
                // whileTap={{ scale: 0.9 }}
                className={twMerge("w-12 h-6 flex items-center px-1 rounded-full", theme === "dark" ? "bg-gray-600 justify-end" : "bg-gray-200 justify-start")}
            >
                <motion.div
                    className="w-4 h-4 rounded-full bg-slate-100 shadow-md flex items-center justify-center"
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                    {theme === "dark" ? (
                        <motion.div transition={{ duration: 0.5 }}>
                            <FaMoon className="text-slate-900/80 h-3 w-3" />
                        </motion.div>
                    ) : (
                        <motion.div key="sun" transition={{ duration: 0.5 }}>
                            <FaSun className="text-yellow-500 h-3 w-3" />
                        </motion.div>
                    )}
                </motion.div>
            </motion.button>
        </div>
    )
}
