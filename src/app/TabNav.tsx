"use client";

import { useCookies } from "react-cookie";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabNavCookie from "./TabNavCookie";
import { useEffect, useOptimistic, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import useDisablePageStore from "@/components/useDisablePageStore";

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
  const disable = useDisablePageStore((state) => state.disable);
  const enable = useDisablePageStore((state) => state.enable);

  const { tags } = useParams();
  const router = useRouter();
  const [cookies, setCookie] = useCookies([TABNAV_COOKIE_NAME]);
  const primaryTag = tags?.[1];

  const valueToUse = isCookieValueValid(primaryTag)
    ? primaryTag
    : DEFAULT_VALUE;

  const [optimisticActiveTab, updateOptimisticActiveTab] = useOptimistic<
    string,
    string
  >(valueToUse, (_, newPrimaryTag) => {
    console.log("newPrimaryTag", newPrimaryTag);
    return newPrimaryTag;
  });
  const isPending = valueToUse !== optimisticActiveTab;
  //const [tabValue, setTabValue] = useState(initialTabValue);

  const handleTabStateChange = (id: string) => {
    console.log("handleTabStateChange", id);

    updateOptimisticActiveTab(id);
    // setTabValue(id);
    router.push(`/${hub}/${id}`);
  };

  useEffect(() => {
    isPending ? disable() : enable();
  }, [isPending]);

  return (
    <>
      <Tabs
        // defaultValue={tabValue}
        value={optimisticActiveTab}
        className="w-[400px] mb-8"
        onValueChange={handleTabStateChange}
      >
        <TabsList>
          <TabsTrigger value="place">Place</TabsTrigger>
          <TabsTrigger value="person">People</TabsTrigger>
        </TabsList>
      </Tabs>
      <TabNavCookie activeTab={optimisticActiveTab} />
    </>
  );
}
