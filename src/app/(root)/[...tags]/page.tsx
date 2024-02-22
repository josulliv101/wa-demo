import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { EmblaOptionsType } from "embla-carousel";
import { fetchHubProfiles } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";
import TabNav from "@/app/TabNav";
import { tagDefinitions } from "@/lib/tags";

import EmblaCarousel from "@/components/EmblaCarousel";
import { Fragment } from "react";
import PageContent from "@/components/PageContent";

const OPTIONS: EmblaOptionsType = {
  align: "start",
  containScroll: "trimSnaps",
  slidesToScroll: 2,
  dragFree: false,
  loop: false,
  // breakpoints: {
  //   "(min-width: 1080px)": { active: false },
  // },
};

export default async function Hub({
  params: { tags: tagsProp = [] },
}: {
  params: { tags: string[] };
}) {
  const cookieStore = cookies();

  const tabNavCookie = cookieStore.get("tabnav");
  const defaultPrimaryTag = tabNavCookie?.value || "person";
  const [hub = "all", primaryTag = defaultPrimaryTag, ...tags] = tagsProp;

  let tagsToUse: string[] = tagDefinitions[primaryTag]?.children || [];
  if (tags.length) {
    tagsToUse = tags;
  }
  const fetchPromises =
    tagsToUse?.map(
      async (tag: string) => await fetchHubProfiles(hub, primaryTag, [tag])
    ) || [];

  const profilesByTag = await Promise.all(fetchPromises);
  // const [{ label, profiles }] = await Promise.all(fetchPromises);
  return (
    <main className="px-4 py-12 flex flex-col gap-4 container">
      <TabNav defaultValue={primaryTag} hub={hub} />
      <PageContent>
        <h2 className="text-3xl py-8">{hub}</h2>
        {profilesByTag.map(({ label, profiles }) => {
          return (
            <Fragment key={label.join()}>
              <h2 className="text-lg mb-4 font-semibold">
                {label.join(" / ")}
              </h2>
              <EmblaCarousel profiles={profiles} options={OPTIONS} />
              {/* <ScrollArea className="w-full whitespace-nowrap rounded-md border">
              <div className="flex w-max space-x-4 p-4">
                {profiles.map((profile) => (
                  <div key={profile.id}>
                    <Button variant="outline" asChild>
                      <Link
                        className="flex flex-col items-center gap-4 h-full max-w-[180px] rounded-t-md"
                        href={`/profile/${profile.id}`}
                      >
                        <Image
                          className="object-cover object-top h-[240px] w-[180px] max-w-[180px] rounded-t-md"
                          width={120}
                          height={120}
                          alt={profile.name}
                          src={profile.pic}
                        />
                        <div>{profile.name}</div>
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea> */}
            </Fragment>
          );
        })}
        <Link href="/about">About...</Link>
      </PageContent>
    </main>
  );
}
