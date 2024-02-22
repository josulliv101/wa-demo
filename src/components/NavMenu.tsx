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
} from "@/components/ui/navigation-menu";
import NavMenuAbout from "./NavMenuAbout";
import { Button } from "./ui/button";
import { PropsWithChildren, ReactNode } from "react";

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
        <NavigationMenuItem>
          <NavigationMenuTrigger className="">About</NavigationMenuTrigger>
          <NavigationMenuContent>{panelAbout}</NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="">Cities</NavigationMenuTrigger>
          <NavigationMenuContent>{panelCities}</NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
