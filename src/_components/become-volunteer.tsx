"use client";

import { Button } from "./ui/button";

function BecomeVolunteer() {
  return (
    <section className="become-volunteer-section flex flex-col h-full w-full items-center justify-center py-32">
      <div className="flex flex-col h-full w-full p-2 md:w-3/5 lg:w-4/5 md:p-0 items-center gap-10">
        <h3 className="font-semibold text-white">Become a volunteer</h3>
        <p className="text-white max-w-xl leading-relaxed tracking-wide">
          Volunteering is a powerful way to contribute to our cause. Join us as
          a volunteer and make a direct impact on our initiatives. Whether it&apos;s
          tree planting, community clean-ups, or education programs, your
          dedication can make a real difference.
        </p>
        <Button variant={"default"} className="bg-teal-700 text-white px-10">
          Join Us
        </Button>
      </div>
    </section>
  );
}

export { BecomeVolunteer };
