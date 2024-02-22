"use client";

import React, { PropsWithChildren } from "react";
import useEmblaCarousel from "embla-carousel-react";

type PropType = {
  options?: any;
};

export default function EmblaViewport({
  children,
  options,
}: PropsWithChildren<PropType>) {
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <div className="embla__viewport pr-4" ref={emblaRef}>
      {children}
    </div>
  );
}
