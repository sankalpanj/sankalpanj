"use client";

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AuthForm } from "./auth-form";
import { NavMenu } from "./nav-menubar";

function Header() {
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [openSignup, setOpenSignUp] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  const { textColor, navItemColor, background } = useMemo(() => {
    if (
      pathname === "/volunteer" ||
      pathname === "/contact" ||
      pathname === "/members"
    ) {
      if (!scrolledToTop) {
        return {
          textColor: "text-[#ffffff]",
          navItemColor: "text-[#ffffff]",
          background: "bg-[#091b27]",
        };
      }
      return {
        textColor: "text-black",
        navItemColor: "text-black",
        background: "transparent",
      };
    }

    if (pathname.includes('profile') || pathname.includes('donation')) {
      return {
        textColor: "text-white",
        navItemColor: "text-white",
        background: "bg-[#091b27]",
      };
    }

    return {
      textColor: "text-[#ffffff]",
      navItemColor: "text-[#ffffff]",
      background: "transparent",
    };
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
        scrolledToTop ? `${background}` : "bg-[#091b27]"
      }`}
    >
      <div className="flex min-h-14 w-full md:w-3/5 lg:w-4/5 p-3 md:p-0 justify-between items-center m-2">
        <Link href={"/"} className={`${textColor} font-semibold text-xl`}>
          Sankalpa USA
        </Link>
        <nav className="hidden md:block w-auto">
          <ul
            className={`flex w-auto gap-6 group ${navItemColor} items-center`}
          >
            <li>
              <Link href={"/donation"}>Donate</Link>
            </li>
            <li>
              <Link href={"/members"}>Members</Link>
            </li>
            {/* <li>
              <Link href={"/volunteer"}>Volunteers</Link>
            </li> */}
            <li>
              <Link href={"/events"}>Events</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact us</Link>
            </li>
            <SignedOut>
              <li>
                <Link
                  href={"/"}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenSignUp(true);
                  }}
                >
                  Sign in
                </Link>
              </li>
            </SignedOut>
            <SignedIn>
              <UserButton
                userProfileUrl={`/profile/${user?.id}`}
                userProfileMode="navigation"
              />
            </SignedIn>
          </ul>
        </nav>
        <div className="flex md:hidden">
          <NavMenu />
        </div>
      </div>
      <AuthForm open={openSignup} close={setOpenSignUp} />
    </header>
  );
}

export { Header };
