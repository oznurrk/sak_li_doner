"use client";

import Image from "next/image";
import { useState } from "react";

type ProductPhotoProps = {
  src: string;
  name: string;
  sample: boolean;
  compact: boolean;
};

export function ProductPhoto({ src, name, sample, compact }: ProductPhotoProps) {
  const [failed, setFailed] = useState(false);
  const alt = sample
    ? `${name} için örnek tasarım görseli. Saklı Döner ürününün gerçek fotoğrafı değildir.`
    : `${name} ürün görseli`;

  return (
    <div
      className={
        compact
          ? "relative mb-3 w-full overflow-hidden rounded-xl bg-ink"
          : "relative mb-4 aspect-[1.5] overflow-hidden rounded-xl bg-ink-raised"
      }
      style={compact ? { aspectRatio: "4 / 3" } : undefined}
    >
      {failed ? (
        <div className="flex h-full items-center justify-center px-3 text-center text-xs leading-snug text-cream-soft">
          Görsel yüklenemedi
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={
            compact
              ? "(min-width: 1280px) 240px, (min-width: 768px) 30vw, 100vw"
              : "(min-width: 1280px) 360px, (min-width: 640px) 45vw, 100vw"
          }
          className={compact ? "object-contain object-center" : "object-cover"}
          style={compact ? { objectFit: "contain" } : undefined}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
