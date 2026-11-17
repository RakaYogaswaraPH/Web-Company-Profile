"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const Logo3DScene = dynamic(
  () => import("./logo-3d-scene").then((mod) => mod.Logo3DScene),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full h-[420px] sm:h-[450px] lg:h-[480px] xl:h-[500px] flex items-center justify-center">
        <div className="relative w-36 h-36 opacity-30 animate-pulse">
          <Image
            src="/icons/icons.webp"
            alt="Logo 3D Loading"
            fill
            className="object-contain"
          />
        </div>
      </div>
    ),
  }
);

interface Logo3DViewerProps {
  className?: string;
}

export function Logo3DViewer({ className }: Logo3DViewerProps) {
  return <Logo3DScene className={className} />;
}
