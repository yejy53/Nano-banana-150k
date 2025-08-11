import React from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#191919] transition-colors">
      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
      {/* Footer */}
      {/* <footer className="w-full py-4 text-center text-gray-500 text-sm bg-white/60 dark:bg-gray-900/60">
        © {new Date().getFullYear()} Echo 4o Image. All rights reserved.
      </footer> */}
    </div>
  );
} 