https://i.imgur.com/yVeIeDa.jpeg
https://in.pinterest.com/pin/3799980930657060/
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import React, { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/cart", label: "Cart" },
];

function Navbar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(null);

  const pillTarget = hovered || pathname;

  return (
    <nav className="p-3 sticky z-10 top-[10px] overflow-hidden bg-white rounded-full flex gap-1 items-center w-fit">
      {links.map((link) => {
        const isHighlighted = pillTarget === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            onMouseEnter={() => setHovered(link.href)}
            onMouseLeave={() => setHovered(null)}
            className="relative py-1 px-4 rounded-full"
          >
            {isHighlighted && (
              <motion.span
                layoutId="pill"
                className="absolute inset-0 bg-black rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 ${
                isHighlighted ? "text-white" : "text-black"
              }`}
            >
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default Navbar;
