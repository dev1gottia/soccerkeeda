"use client";

import { Card } from "./ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggler from "./ThemeToggler";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Scores" },
    { href: "/news", label: "News" },
  ];

  return (
    <Card className="bg-card border-b p-5 rounded-none">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left side: Logo + Tabs */}
        <div className="flex items-center gap-18">
          {/* Logo */}
          <span className="text-2xl font-bold">SOCCERKEEDA</span>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-lg font-[400] ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-0.5 bg-green-500 transition-all duration-300
                      ${isActive ? "w-full" : "w-0"}`}
                  ></span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Side (ThemeToggler + Mobile Menu Button) */}
        <div className="flex items-center gap-4">
          <ThemeToggler />

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 border-t pt-3">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg ${
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </Card>
  );
}
