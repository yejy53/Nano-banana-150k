import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useState } from "react";

const ReviewCard = ({ img, onClick }: { img: string; onClick: () => void }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-40 cursor-pointer overflow-hidden rounded-xl ",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        "hover:-translate-y-2 transition-transform duration-200"
      )}
      onClick={onClick}
    >
      {/* <img className="rounded-2xl cursor-pointer" width="100%" height="512px" alt="" src={img} /> */}
      <img 
        className="rounded-2xl cursor-pointer object-cover"
        style={{ height: 'auto', width: '512px' }}  // 更小的显示尺寸
        loading="lazy"  // 懒加载
        alt="" 
        src={img} 
      />
    </figure>
  );
};

export function ImageMarquee({ images }: { images: string[] }) {
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const firstRow = images.slice(0, images.length / 2);
  // const secondRow = images.slice(images.length / 2);

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((img, idx) => (
          <ReviewCard key={img} img={img} onClick={() => setZoomIndex(idx)} />
        ))}
      </Marquee>
      {/* <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((img, idx) => (
          <ReviewCard key={img} img={img} onClick={() => setZoomIndex(idx + firstRow.length)} />
        ))}
      </Marquee> */}
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div> */}
      {zoomIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setZoomIndex(null)}
        >
          <button
            className="absolute left-[7vw] text-3xl text-white bg-black/40 rounded-full px-3 py-1 hover:bg-white/40"
            onClick={e => {
              e.stopPropagation();
              setZoomIndex((zoomIndex - 1 + firstRow.length) % firstRow.length);
            }}
          >
            <ArrowLeft className="size-10"/>
          </button>
          <img
            src={firstRow[zoomIndex]}
            alt="zoomed"
            className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl border-4 border-white transition-transform duration-300 scale-100"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute right-[7vw] text-3xl text-white bg-black/40 rounded-full px-3 py-1 hover:bg-white/40"
            onClick={e => {
              e.stopPropagation();
              setZoomIndex((zoomIndex + 1) % firstRow.length);
            }}
          >
            <ArrowRight className="size-10"/>
          </button>
          <button
            className="absolute top-8 right-8 text-2xl text-white bg-black/40 rounded-full px-3 py-1 hover:bg-white/40"
            onClick={e => {
              e.stopPropagation();
              setZoomIndex(null);
            }}
          >
            <X className="size-10"/>
          </button>
        </div>
      )}
    </div>
  );
}
