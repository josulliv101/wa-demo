import { PropsWithChildren, ReactNode } from "react";

export default function Layout({
  children,
  profile,
  params,
}: PropsWithChildren<{ params: any; profile?: ReactNode }>) {
  const content = params.id?.length ? profile : children;
  return (
    <div>
      <div>layout params: {JSON.stringify(params)}</div>
      <div>
        {profile}
        {children}
      </div>
    </div>
  );
}
