"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NavMenu } from "./nav-menubar";

function Header() {
  const [scrolledToTop, setScrolledToTop] = useState(true);

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
        <Link href={"/"} className="text-white font-semibold text-xl">
          Sankalpa USA
        </Link>
        <nav className="hidden md:block w-auto">
          <ul className="flex w-auto gap-6 group">
            <li className="text-[#ffffff]">
              <Link className="font-semibold" href={"/donation"}>
                Donate
              </Link>
            </li>
            <li className="text-[#ffffff]">
              <Link className="font-semibold" href={"/members"}>
                Members
              </Link>
            </li>
            <li className="text-[#ffffff]">
              <Link className="font-semibold" href={"/volunteers"}>
                Volunteers
              </Link>
            </li>
            <li className="text-[#ffffff]">
              <Link className="font-semibold" href={"/events"}>
                Events
              </Link>
            </li>
            <li className="text-[#ffffff]">
              <Link className="font-semibold" href={"/contact"}>
                Contact us
              </Link>
            </li>
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
