import { About } from "@/_components/about";
import { BecomeVolunteer } from "@/_components/become-volunteer";
import { FeaturedEvents } from "@/_components/featured-events";
import { ImageGallery } from "@/_components/image-gallery";
import { MajorCauses } from "@/_components/major-causes";
import { Button } from "@/_components/ui/button";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <div className="flex flex-col grow w-full justify-center items-center">
      <div className="flex w-full md:w-3/5 lg:w-4/5 grow justify-center items-center py-32">
        <Image src={"/images/banner_b.jpg"} width={800} height={1000} alt="5k-run" />
        {/* <div className="flex flex-col grow gap-5 md:gap-10">
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
        </div> */}
        <ImageGallery />
      </div>
      <div className="flex w-full min-h-28 bg-teal-700 backdrop-filter backdrop-blur-md bg-opacity-55">
        <div className="flex mx-auto gap-5 items-center">
          <Image
            src={"/images/5kRun/logo.png"}
            width={50}
            height={50}
            alt="5k-run"
          />
          <div className="flex flex-col gap-1 min-w-36">
            <p className="text-lg font-bold text-white">Upcoming event</p>
            <p className="text-base font-semibold text-white">
              5K Run/ 2K Walk
            </p>
          </div>
          <Link className="flex w-full gap-5" href={"/events"}>
            <Button variant={"outline"} size={"sm"}>
              Know more
            </Button>
          </Link>
        </div>
      </div>
      <MajorCauses />
      <About />
      <FeaturedEvents />
      <BecomeVolunteer />
    </div>
  );
}
