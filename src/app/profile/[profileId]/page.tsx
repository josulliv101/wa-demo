import { fetchProfile } from "@/lib/firebase";
import { Suspense, cache } from "react";
import Something from "./Something";
import { Badge } from "@/components/ui/badge";
import { profileSchema } from "@/lib/profile";

// async function fetchProfile(id: string) {
//   const resp = await fetch(
//     `https://firestore.googleapis.com/v1/projects/fir-abc-a965d/databases/(default)/documents/entity/${id}`
//   );
//   const profile = await resp.json();
//   return profile;
// }

export function generateStaticParams() {
  return [];
}

const getProfile = cache(fetchProfile);

export default async function Profile({
  params,
}: {
  params: { profileId: string };
}) {
  const { profileId } = params;
  const profile = await getProfile(profileId);
  return (
    <main className="animate-fade px-4 py-12 container">
      <h2>
        {profile.name} / {profile.oinks}
      </h2>
      <div className="flex gap-2 py-4 h-[54px]">
        {profile.tags.sort().map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <p>{profile.description}</p>
      <Suspense
        fallback={
          <div
            key="loading"
            className="p-4 bg-gray-100 text-muted-foreground my-4"
          >
            loading...
          </div>
        }
      >
        <Something key="something" />
      </Suspense>
      <div className="flex flex-col gap-4">
        {profile.reasons.map(({ id, reason, ratings }) => {
          return <div key={id}>{reason}</div>;
        })}
      </div>
    </main>
  );
}
