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
          ? "relative mb-3 aspect-square overflow-hidden rounded-xl bg-ink-raised"
          : "relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-ink-raised"
      }
    >
      {failed ? (
        <div className="flex h-full items-center justify-center px-3 text-center text-xs leading-snug text-cream-soft">
          Örnek görsel yüklenemedi
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={
            compact
              ? "(min-width: 1280px) 180px, (min-width: 640px) 30vw, 50vw"
              : "(min-width: 1280px) 360px, (min-width: 640px) 45vw, 100vw"
          }
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
      {sample ? (
        <span className="absolute top-2 left-2 rounded-full bg-ink/85 px-2 py-0.5 text-[11px] font-semibold text-cream">
          Örnek görsel
        </span>
      ) : null}
    </div>
  );
}
