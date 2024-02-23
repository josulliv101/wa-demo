import { PropsWithChildren, ReactNode } from "react";

export default function Layout({
  children,
  profile,
  params,
}: PropsWithChildren<{ params: any; profile: ReactNode }>) {
  return (
    <>
      {profile}
      {children}
    </>
  );
}
