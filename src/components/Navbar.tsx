"use client";

import { Card } from "./ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Scores" },
    { href: "/news", label: "News" },
  ];

  return (
    <Card className="bg-card border-b p-5 rounded-none">
      <div className="container mx-auto flex items-center gap-26">
        {/* Logo */}
        <div>
          <span className="text-2xl font-bold">SOCCERKEEDA</span>
        </div>

        {/* Navigation */}
        <div>
          <div className="flex gap-11">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-lg font-[400] ${
                    isActive ? "text-black-foreground" : "text-muted-foreground"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute left-0 -bottom-0 h-0.5 bg-green-500 transition-all duration-300
                      ${isActive ? "w-full" : "w-0"}`}
                  ></span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
