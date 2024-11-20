"use client";

import { Button } from "@/_components/ui/button";

export default function Volunteer() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <div className="flex volunteer-container grow w-full relative">
        <div className="flex flex-col h-auto w-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-5">
          <p className="text-4xl font-semibold">
            Volunteering is a powerful way to contribute to our cause.
          </p>
          <p className="text-xl text-[#8a8888] leading-relaxed">
            Join us as a volunteer and make a direct impact on our initiatives.
            Whether it&apos;s tree planting, community clean-ups, or education
            programs, your dedication can make a real difference. Middle and
            High Schoolers will get certificates for their volunteer hours.
            Ready to get involved? Contact us to learn more about our membership
            and volunteer opportunities. Together, we can create a better world.
          </p>
          <div>
            <Button variant={"default"}>Join now</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
