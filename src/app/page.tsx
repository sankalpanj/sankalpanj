import { About } from "@/_components/about";
import { BecomeVolunteer } from "@/_components/become-volunteer";
import LatestEvent from "@/_components/event-marquee";
import { FeaturedEvents } from "@/_components/featured-events";
import { ImageGallery } from "@/_components/image-gallery";
import { MajorCauses } from "@/_components/major-causes";
import { Button } from "@/_components/ui/button";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <div className="flex flex-col grow w-full justify-center">
      <div className="flex w-full h-full justify-center items-center">
        <div className="flex flex-col grow gap-5 md:gap-10 pl-32">
          <h1 className="font-semibold leading-relaxed">
            Sankalpa is for a greener and better tomorrow
          </h1>
          <div className="flex w-auto gap-5 md:gap-10">
            <Link href={"/events"}>
              <Button variant={"default"}>See Events</Button>
            </Link>
            <Link href={"/donation"}>
              <Button variant={"default"}>Donate</Button>
            </Link>
          </div>
        </div>
        <ImageGallery />
      </div>
      <LatestEvent />
      <MajorCauses />
      <About />
      <FeaturedEvents />
      <BecomeVolunteer />
    </div>
  );
}
