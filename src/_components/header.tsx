"use client";

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthForm } from "./auth-form";
import { NavMenu } from "./nav-menubar";

function Header() {
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [openSignup, setOpenSignUp] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  const [selectedNavItem, setSelectedNavItem] = useState<
    | "donation"
    | "members"
    | "events"
    | "contact"
    | "signin"
    | "subscriptions"
    | "home"
  >("home");

  useEffect(() => {
    setSelectedNavItem(
      pathname === "/donation"
        ? "donation"
        : pathname === "/members"
        ? "members"
        : pathname === "/events"
        ? "events"
        : pathname === "/contact"
        ? "contact"
        : pathname === "/signin"
        ? "signin"
        : pathname === "/subscriptions"
        ? "subscriptions"
        : "home"
    );
  }, [pathname]);

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
      className={`flex h-auto w-full md:p-0 z-[999] bg-[#091b27] text-white transition-all duration-200 justify-center ${
        !scrolledToTop ? `fixed top-0` : "bg-[#091b27]"
      }`}
    >
      <div className="flex min-h-14 w-full md:w-3/5 lg:w-4/5 p-3 md:p-0 justify-between items-center m-2">
        <Link href={"/"} className={`font-semibold text-xl`}>
          Sankalpa USA
        </Link>
        <nav className="hidden md:block w-auto">
          <ul className={`flex w-auto gap-6 group items-center font-semibold`}>
            <li>
              <Link
                href={"/donation"}
                className={`${
                  selectedNavItem === "donation" &&
                  "text-orange-500 [text-shadow:0_0_5px_rgba(255,165,0,0.5)]"
                }`}
              >
                Donate
              </Link>
            </li>
            <li>
              <Link
                href={"/subscriptions"}
                className={`${
                  selectedNavItem === "subscriptions" &&
                  "text-orange-500 [text-shadow:0_0_5px_rgba(255,165,0,0.5)]"
                }`}
              >
                Subscription
              </Link>
            </li>
            <li>
              <Link
                href={"/members"}
                className={`${
                  selectedNavItem === "members" &&
                  "text-orange-500 [text-shadow:0_0_5px_rgba(255,165,0,0.5)]"
                }`}
              >
                Members
              </Link>
            </li>
            {/* <li>
              <Link href={"/volunteer"}>Volunteers</Link>
            </li> */}
            <li>
              <Link
                href={"/events"}
                className={`${
                  selectedNavItem === "events" &&
                  "text-orange-500 [text-shadow:0_0_5px_rgba(255,165,0,0.5)]"
                }`}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href={"/contact"}
                className={`${
                  selectedNavItem === "contact" &&
                  "text-orange-500 [text-shadow:0_0_5px_rgba(255,165,0,0.5)]"
                }`}
              >
                Contact us
              </Link>
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
