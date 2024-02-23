"use client";

import { config, isRootHub } from "@/lib/config";
import { formatIdToLabel } from "@/lib/formatting";
import { GlobeIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function HeaderTitle() {
  const params = useParams();
  const { tags } = params;
  const hub = typeof tags === "string" ? tags : tags?.[0];
  const showWelcome = isRootHub(hub);

  return (
    <p className="text-md text-muted-foreground">
      {isRootHub(hub) && (
        <>
          Welcome to{" "}
          <Link href="/">
            <strong className="capitalize">{config.org}</strong>
          </Link>
          .
        </>
      )}
      {hub && !isRootHub(hub) && (
        <Link href={`/${hub}`} className="flex items-center gap-2">
          <GlobeIcon className="h-4 w-4" />
          <strong className="capitalize">{formatIdToLabel(hub)}</strong>
        </Link>
      )}
      {!hub && (
        <Link href="/">
          <strong className="capitalize">{config.org}</strong>
        </Link>
      )}
    </p>
  );
}
