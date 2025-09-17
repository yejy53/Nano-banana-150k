'use client'
import React, { useCallback, useEffect, useState } from "react"
import { useTheme } from 'next-themes'
import { ThemeToggleButton, useThemeTransition } from "@/components/ui/shadcn-io/theme-toggle-button"

export const ThemeSwitcher = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { startTransition } = useThemeTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    startTransition(() => {
      setTheme(newTheme);
    });
    console.log('Theme toggled to:', newTheme);
  };

  const currentTheme = theme === 'system' ? systemTheme : theme;

  if (!mounted) {
      return null;
  }

  return (
    <div>
      <ThemeToggleButton 
      theme={currentTheme as 'light' | 'dark'}
      onClick={handleThemeToggle}
      variant="circle"
      start="bottom-right"
    />
    </div>
  );
}
