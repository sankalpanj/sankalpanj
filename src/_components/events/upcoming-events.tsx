import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

function RenderEventDetails() {
  return (
    <div className="flex flex-col h-auto w-full rounded-lg p-2 bg-[#f9fafc] gap-3 border">
      <div className="flex w-full gap-8">
        <Image
          src={"/images/5kRun/logo.png"}
          width={200}
          height={100}
          className="p-1 border rounded-full bg-white shadow-md aspect-square object-cover"
          alt="5k-run"
        />
        <div className="flex flex-col">
          <label
            htmlFor="event-label"
            className="font-semibold text-[#072366] mb-5"
          >
            Join Us for the 3rd Annual 5K Run / 2K Walk – Supporting a Greener
            Future!
          </label>
          <p
            id="event-label"
            className="pt-2 text-base text-[#808080] leading-relaxed font-semibold"
          >
            We are excited to host our 3rd Annual 5K Run / 2K Walk, a fun and
            impactful event that brings our community together for a great
            cause! As a non-profit organization dedicated to environmental
            sustainability, we organize this event every year to raise funds and
            awareness for local conservation efforts.
          </p>
          <p
            id="event-label"
            className="pt-2 text-base text-[#808080] leading-relaxed font-semibold"
          >
            All proceeds from this event go directly to the Township’s
            environmental initiatives, such as preserving green spaces, planting
            trees, and promoting eco-friendly projects. By participating, you’re
            not just running or walking—you’re making a difference for the
            planet!
          </p>
          <p
            id="event-label"
            className="pt-2 text-base text-[#808080] leading-relaxed font-semibold"
          >
            Join us for a morning of fitness, friendship, and environmental
            action. Whether you run, walk, or cheer from the sidelines, every
            step counts toward a greener future!
          </p>
        </div>
      </div>
      <div className="flex w-full justify-between items-center py-3">
        <div className="flex w-full gap-1 items-center text-[#808080]">
          <MapPin className="text-inherit w-4 h-4" />
          <p className="text-sm">Plainsboro Community Park, New Jersey</p>
          <Link
            href={"https://runsignup.com/Race/NJ/Plainsboro/Sankalpa5Krun"}
            target="_blank"
            className="flex justify-center"
          >
            <Button variant={"default"} className="ml-5">
              Learn more
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function UpcomingEvents() {
  return (
    <div className="flex flex-col w-full h-full gap-5 min-h-[200px] my-8">
      <h3 className="text-2xl font-semibold text-[#072366]">Upcoming Events</h3>
      {/* <Alert
        variant="default"
        className="w-full mx-auto bg-gradient-to-r from-green-50 to-teal-50 border-green-200 animate-fade-in"
      >
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <CalendarHeart className="h-16 w-16 text-green-600" />
            <Users className="h-8 w-8 text-teal-500 absolute -bottom-2 -right-2" />
          </div>
          <AlertTitle className="text-xl font-semibold text-green-700 mb-2">
            Community Events Coming Soon!
          </AlertTitle>
          <AlertDescription className="text-green-600 mb-4">
            We're planning exciting community events to bring us all together.
            Stay tuned for upcoming opportunities to engage, learn, and make a
            difference!
          </AlertDescription>
        </div>
      </Alert> */}
      <RenderEventDetails />
    </div>
  );
}

export { UpcomingEvents };
