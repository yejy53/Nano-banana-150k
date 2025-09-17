"use client"

import { ThemeSwitcher } from "@/components/web-ui/theme-switcher";
import Link from "next/link";
import Image from 'next/image';
import React from "react";


export function NavBar() {
  return (
    // <div className="w-full min-h-screen bg-muted">
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Image
              src="assets/banana.png"
              alt="Logo"
              width={25}
              height={25}
              className="rounded-full"
            />
            <Link href="/" className="text-lg font-bold">
              Nano Banana 150K
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
    // </div>
  );
}
