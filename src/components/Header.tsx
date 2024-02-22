import Link from "next/link";
import NavMenu from "./NavMenu";
import NavMenuAbout from "./NavMenuAbout";
import NavMenuCities from "./NavMenuCities";
import { config } from "@/lib/config";

export default function Header() {
  return (
    <header className="flex flex-wrap shadow-md z-50 w-full bg-blue-500 text-white text-sm py-3 dark:bg-gray-800">
      <nav
        className="relative container w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center gap-6">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Whats Awesome</span>
            <img
              // className="h-8 w-auto"
              className={`h-8 w-auto origin-bottom animate-rubberBandJump`}
              src={config.logoPath}
              alt="whatsawesome"
            />
          </Link>

          <Link
            className="text-md font-semibold flex-none dark:text-white"
            href="/"
          >
            What's Awesome
          </Link>
        </div>
        <NavMenu
          panelAbout={<NavMenuAbout />}
          panelCities={<NavMenuCities />}
        ></NavMenu>
        <span className="text-3xl">🐶</span>
      </nav>
    </header>
  );
}
