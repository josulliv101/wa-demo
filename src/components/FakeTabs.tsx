"use client";

import {
  startTransition,
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { Button } from "./ui/button";
import { CheckCheckIcon, CheckSquareIcon, SquareIcon } from "lucide-react";
import Link from "next/link";
import { boolean, promise } from "zod";
import { useRouter } from "next/navigation";
import useDisablePageStore from "./useDisablePageStore";

function useOptimisticHub(hub: string): [string, (s: string) => void, boolean] {
  const [optimisticHub, updateOptimisticHub] = useOptimistic<string, string>(
    hub,
    (_, newHub) => newHub
  );
  const isPending = hub !== optimisticHub;

  return [optimisticHub, updateOptimisticHub, isPending];
}

export default function FakeTabs({ hub }: { hub: string }) {
  const disable = useDisablePageStore((state) => state.disable);
  const enable = useDisablePageStore((state) => state.enable);

  const [optimisticHub, updateOptimisticHub, isPending] = useOptimisticHub(hub);

  async function handleUpdate(id: string) {
    updateOptimisticHub(id);
    await Promise.resolve();
  }

  useEffect(() => {
    isPending ? disable() : enable();
  }, [isPending]);

  return (
    <div
      className={
        "flex items-center justify-center gap-3 " +
        (isPending ? "opacity-100" : "opacity-100")
      }
    >
      <Button className="gap-2" asChild>
        <Link href="/boston" onClick={() => handleUpdate("boston")}>
          {optimisticHub === "boston" ? <CheckSquareIcon /> : <SquareIcon />}{" "}
          boston
        </Link>
      </Button>
      <Button className="gap-2" asChild>
        <Link
          href="/new-york-city"
          onClick={() => handleUpdate("new-york-city")}
        >
          {optimisticHub === "new-york-city" ? (
            <CheckSquareIcon />
          ) : (
            <SquareIcon />
          )}{" "}
          nyc
        </Link>
      </Button>
    </div>
  );
}
