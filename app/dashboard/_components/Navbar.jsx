"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton,SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/history", label: "Past Interviews" },
    { href: "/HowItWorks", label: "How it works?" },
  ];

  return (
    <nav className=" bg-background/95 backdrop-blur-md border-b border-border/50 shadow-elegant">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center cursor-pointer justify-between h-14 sm:h-16 lg:h-18">
          <Link href="/">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Image
                src="/logonew.svg"
                alt="MockMate"
                width={200}
                height={60}
                className="h-9 w-auto sm:h-10 md:h-11 lg:h-12 xl:h-13 2xl:h-14"
                priority
              />
            </div>
          </Link>
          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-secondary/80 ${
                    path === link.href
                      ? "text-primary bg-secondary/50 shadow-glow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {path === link.href && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center space-x-3">
            <SignedIn>
              <div className="p-1 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard: "bg-card border-border",
                      userButtonPopoverActionButton: "hover:bg-secondary",
                    },
                  }}
                />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <button className="relative overflow-hidden group bg-gradient-to-r cursor-pointer from-secondary to-primary hover:shadow-lg text-primary-foreground px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ">
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-glow/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="relative overflow-hidden group bg-gradient-to-r cursor-pointer from-secondary to-primary hover:shadow-lg text-primary-foreground px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95">
                  <span className="relative z-10">Sign Up</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-glow/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </SignUpButton>
            </SignedOut>
          </div>

          {/* Mobile/Tablet menu button */}
          <div className="flex items-center space-x-3 lg:hidden">
            {/* Mobile Auth for signed in users */}
            <SignedIn>
              <div className="p-1 rounded-lg bg-secondary/30">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-7 h-7 sm:w-8 sm:h-8",
                      userButtonPopoverCard: "bg-card border-border",
                      userButtonPopoverActionButton: "hover:bg-secondary",
                    },
                  }}
                />
              </div>
            </SignedIn>

            <button
              className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 bg-card/50 backdrop-blur-sm rounded-b-lg mx-4 sm:mx-0">
            <div className="flex flex-col gap-2 px-4 sm:px-0">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`relative px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    path === link.href
                      ? "text-primary bg-secondary/70 shadow-glow border-l-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  }`}
                >
                  {link.label}
                </a>
              ))}

              <SignedOut>
                <div className="pt-4 border-t border-border/50 mt-2 flex gap-2">
                  <SignInButton>
                    <button
                      className="flex-1 bg-gradient-primary hover:shadow-glow text-primary-foreground px-4 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button
                      className="flex-1 bg-gradient-to-r from-secondary to-primary hover:shadow-lg text-primary-foreground px-4 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
