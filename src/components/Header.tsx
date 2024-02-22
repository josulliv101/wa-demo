import Link from "next/link";
import NavMenu from "./NavMenu";
import NavMenuAbout from "./NavMenuAbout";
import NavMenuCities from "./NavMenuCities";
import { config } from "@/lib/config";
import { Badge } from "./ui/badge";

export default function Header() {
  return (
    <header className="sticky top-0 flex flex-wrap shadow-md z-50 w-full bg-gray-100 text-white text-sm py-2 md:py-3 dark:bg-gray-800">
      <nav
        className="relative container w-full mx-auto px-4 flex items-center justify-between"
        aria-label="Global"
      >
        <div className="flex items-center gap-6">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{config.org}</span>
            <img
              // className="h-8 w-auto"
              className={`h-8 w-auto origin-bottom animate-rubberBandJump`}
              src={config.logoPath}
              alt={config.org}
            />
          </Link>
          <Badge variant={"default"} className="rounded-sm">
            {config.org}
          </Badge>
        </div>
        <NavMenu
          panelAbout={<NavMenuAbout />}
          panelCities={<NavMenuCities />}
        ></NavMenu>
      </nav>
    </header>
  );
}
