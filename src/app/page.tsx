import { About } from "@/_components/about";
import { BecomeVolunteer } from "@/_components/become-volunteer";
import { FeaturedEvents } from "@/_components/featured-events";
import { MajorCauses } from "@/_components/major-causes";
import { Button } from "@/_components/ui/button";
import { Volunteer } from "@/_components/volunteer";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <div className="flex flex-col grow w-full justify-center">
      <div className="flex w-full h-full justify-center items-center hero-section">
        <div className="flex flex-col grow gap-5 md:gap-10 items-center justify-center">
          <h1 className="text-white font-semibold">We Improve Biodiversity</h1>
          <h2 className="text-white font-semibold">
            in the Mercer County Area
          </h2>
          <div className="flex w-auto gap-5 md:gap-10">
            <Link href={"/"}>
              <Button variant={"secondary"}>See Events</Button>
            </Link>
            <Link href={"/donation"}>
              <Button variant={"secondary"}>Donate</Button>
            </Link>
          </div>
        </div>
      </div>
      <MajorCauses />
      <About />
      <FeaturedEvents />
      <Volunteer />
      <BecomeVolunteer />
    </div>
  );
}
