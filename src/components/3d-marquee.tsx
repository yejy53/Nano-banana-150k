"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { TitleReveal } from "@/components/head-title";

export function ThreeDMarqueeHeader({ images }: { images: string[] }) {
  return (
    <div className="relative flex w-full h-[60vw] flex-col items-center justify-center overflow-hidden">
      <TitleReveal />
    
      <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/40" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={images}
      />
    </div>
  );
}
