"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export { CookiesProvider } from "react-cookie";

export const TABNAV_COOKIE_NAME = "tabnav";

export default function TabNavCookie({ activeTab }: { activeTab: string }) {
  const [_, setCookie] = useCookies([TABNAV_COOKIE_NAME]);
  const router = useRouter();
  useEffect(() => {
    console.log("active tab changed", activeTab);
    setCookie(TABNAV_COOKIE_NAME, activeTab);
    router.refresh();
  }, [activeTab]);

  return null;
}
