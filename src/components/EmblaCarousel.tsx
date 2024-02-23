import React from "react";
import Image from "next/image";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import EmblaViewport from "@/components/EmblaViewport";
import Link from "next/link";
import { Profile } from "@/lib/profile";

type PropType = {
  profiles: Array<Profile>;
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { profiles, options } = props;
  return (
    <div className="embla mb-16 border rounded-sm bg-white">
      <EmblaViewport options={options}>
        <div className="embla__container pl-4 pt-4">
          {profiles.map(({ id, name, pic }, index) => (
            <Link
              className="embla__slide "
              key={id}
              href={`/profile/${id}`}
              // prefetch={true}
            >
              <div className="">
                <div className="h-[200px]">
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
                <div className="relative -left-2 ml-4 text-sm text-center text-muted-foreground text-balance px-2 py-4">
                  {name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </EmblaViewport>
    </div>
  );
};

export default EmblaCarousel;
