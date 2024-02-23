"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import NavMenuAbout from "./NavMenuAbout";
import { Button } from "./ui/button";
import { PropsWithChildren, ReactNode } from "react";
import Link from "next/link";

export default function NavMenu({
  children,
  panelAbout,
  panelCities,
}: PropsWithChildren<{
  panelAbout: ReactNode;
  panelCities: ReactNode;
}>) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="text-muted-foreground lg:inline-flex">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-muted-foreground">
            Major Cities
          </NavigationMenuTrigger>
          <NavigationMenuContent>{panelCities}</NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-muted-foreground">
            About
          </NavigationMenuTrigger>
          <NavigationMenuContent>{panelAbout}</NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
