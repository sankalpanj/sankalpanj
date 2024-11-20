"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { NavMenu } from "./nav-menubar";

function Header() {
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const pathname = usePathname();

  const { textColor, navItemColor } = useMemo(() => {
    if (pathname === "/volunteer" || pathname === "/contact") {
      if (!scrolledToTop) {
        return { textColor: "text-[#ffffff]", navItemColor: "text-[#ffffff]" };
      }
      return { textColor: "text-black", navItemColor: "text-black" };
    }
    
    return { textColor: "text-[#ffffff]", navItemColor: "text-[#ffffff]" };
  }, [pathname, scrolledToTop]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolledToTop(offset > 40 ? false : true);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`flex h-auto w-full md:p-0 fixed top-0 z-50 transition-all duration-300 ease-linear justify-center ${
        scrolledToTop ? "bg-transparent" : "bg-[#091b27]"
      }`}
    >
      <div className="flex min-h-14 w-full md:w-3/5 lg:w-4/5 p-3 md:p-0 justify-between items-center m-2">
        <Link href={"/"} className={`${textColor} font-semibold text-xl`}>
          Sankalpa USA
        </Link>
        <nav className="hidden md:block w-auto">
          <ul className={`flex w-auto gap-6 group ${navItemColor}`}>
            <li>
              <Link href={"/donation"}>Donate</Link>
            </li>
            <li>
              <Link href={"/members"}>Members</Link>
            </li>
            <li>
              <Link href={"/volunteer"}>Volunteers</Link>
            </li>
            <li>
              <Link href={"/events"}>Events</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact us</Link>
            </li>
            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl={"/pricing"} />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </ul>
        </nav>
        <div className="flex md:hidden">
          <NavMenu />
        </div>
      </div>
    </header>
  );
}

export { Header };
