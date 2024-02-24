import { PropsWithChildren, ReactNode } from "react";
import TabNav from "../TabNav";
import { cookies } from "next/headers";

export default function Layout({
  children,
  profile,
  params: { tags },
}: PropsWithChildren<{ params: any; profile: ReactNode }>) {
  const cookieStore = cookies();

  const tabNavCookie = cookieStore.get("tabnav");
  const [hub = "all", primaryTag = tabNavCookie || "person", ...tagsRest] =
    tags || [];

  return (
    <>
      {profile}
      <main className="px-4 py-12 flex flex-col gap-4 container">
        <TabNav initialValue={primaryTag} hub={hub} />
        {children}
      </main>
    </>
  );
}
