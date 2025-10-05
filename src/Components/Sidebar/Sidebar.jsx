"use client"

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { redirect } from "next/navigation";

export default function Sidebar() {
    const COLLAPSED_W = 64;
    const EXPANDED_W = 220;

    const [isOpen, setIsOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    const expanded = isOpen || isHovering;
    const containerRef = useRef(null);

    const menu = [
        { id: "home", label: "Home" },
        { id: "aboutus", label: "about" },
        { id: "products", label: "Products" },
    ];

    const sidebarVariants = {
        collapsed: { width: COLLAPSED_W },
        expanded: { width: EXPANDED_W },
    };

    return (
        <motion.aside
            ref={containerRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false);
                setHoveredItem(null);
            }}
            initial={false}
            animate={expanded ? "expanded" : "collapsed"}
            variants={sidebarVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative h-full z-40 flex flex-col bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden"
            // className="fixed left-4 top-6 bottom-6 z-40 flex flex-col bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden"
            aria-expanded={expanded}
        >
            <div className="flex items-center justify-between px-3 py-3">
                <div className="flex items-center space-x-3 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: expanded ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={`whitespace-nowrap ${expanded ? "w-auto" : "w-0"}`}
                    >
                        <span className="text-sm font-semibold text-gray-900 block">Ck editor</span>
                        <span className="text-[11px] text-gray-400 block">Demo by r</span>
                    </motion.div>
                </div>
                <button
                    aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                    onClick={() => setIsOpen((s) => !s)}
                    className="p-[10px] rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                    <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5v14M5 12h14" stroke="#5d37a3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </button>
            </div>

            <nav className="flex-1 overflow-auto py-3" aria-label="Main navigation">
                <ul className="flex flex-col gap-1 px-[5px]">
                    {menu.map((m) => (
                        <li key={m.id} className="relative">
                            <button
                                onMouseEnter={() => setHoveredItem(m.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                                onClick={() => {
                                    setIsOpen(true);
                                    // redirect(m.id)
                                }}
                                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors overflow-hidden"
                            >
                                <div className="flex items-center justify-center shrink-0 h-8 w-8 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                    </svg>
                                </div>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: expanded ? 1 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`text-sm text-gray-700 whitespace-nowrap ${expanded ? "block" : "hidden"}`}
                                >
                                    {m.label}
                                </motion.span>
                                {!expanded && hoveredItem === m.id && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -6 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -6 }}
                                        className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 rounded-md bg-gray-900 text-white text-xs shadow-lg whitespace-nowrap"
                                    >
                                        {m.label}
                                    </motion.div>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </motion.aside>
    );
}
