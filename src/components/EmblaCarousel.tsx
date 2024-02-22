import React from "react";
import Image from "next/image";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import EmblaViewport from "@/components/EmblaViewport";
import Link from "next/link";
import { Profile } from "@/lib/profile";

type PropType = {
  slides: string[];
  profiles: Array<Profile>;
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { profiles, options } = props;
  return (
    <div className="embla mb-16 border rounded-sm">
      <EmblaViewport options={options}>
        <div className="embla__container pl-4 pt-4">
          {profiles.map(({ id, name, pic }, index) => (
            <Link key={id} href={`/profile/${id}`} prefetch={true}>
              <div className="embla__slide w-[200px] h-[200px]">
                {/* <img
                  className="embla__slide__img opacity-100 rounded-md"
                  src={pic}
                  alt={name}
                  width={"100%"}
                  height={"auto"}
                /> */}
                <Image
                  className="embla__slide__img opacity-100 rounded-md border"
                  src={pic}
                  alt={name}
                  width={200}
                  height={200}
                  priority={index < 4}
                  // fill={true}
                />
              </div>
              <div className="max-w-[200px] ml-4 text-sm text-center text-muted-foreground text-balance px-2 py-4">
                {name}
              </div>
            </Link>
          ))}
        </div>
      </EmblaViewport>
    </div>
  );
};

export default EmblaCarousel;
