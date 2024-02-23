"use client";

import { PropsWithChildren } from "react";
import useDisablePageStore from "./useDisablePageStore";

export default function PageContent({ children }: PropsWithChildren) {
  const disable = useDisablePageStore((state) => state.disablePage);
  return (
    <div className="animate-fade">
      <div
        className={` transition-all duration-150 ease-in ${
          disable ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
