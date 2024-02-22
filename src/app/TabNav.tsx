"use client";

import { useCookies } from "react-cookie";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabNavCookie from "./TabNavCookie";
import { useState } from "react";
import Link from "next/link";

const OPTIONS = ["place", "person"];
const DEFAULT_VALUE = OPTIONS[0];
export const TABNAV_COOKIE_NAME = "tabnav";

const isCookieValueValid = (val: string) => OPTIONS.includes(val);

export default function TabNav({
  defaultValue,
  hub,
}: {
  defaultValue: string;
  hub: string;
}) {
  const [cookies, setCookie] = useCookies([TABNAV_COOKIE_NAME]);

  const initialTabValue = isCookieValueValid(defaultValue)
    ? defaultValue
    : DEFAULT_VALUE;

  const [tabValue, setTabValue] = useState(initialTabValue);

  return (
    <>
      <Tabs
        defaultValue={tabValue}
        className="w-[400px]"
        onValueChange={setTabValue}
      >
        <TabsList>
          <TabsTrigger value="place" asChild>
            <Link href={`/${hub}/place`}>Place</Link>
          </TabsTrigger>
          <TabsTrigger value="person" asChild>
            <Link href={`/${hub}/person`}>People</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <TabNavCookie activeTab={tabValue} />
    </>
  );
}
