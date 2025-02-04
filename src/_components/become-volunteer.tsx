"use client";

import { useState } from "react";
import { AuthForm } from "./auth-form";
import { Button } from "./ui/button";

function BecomeVolunteer() {
  const [openAuthForm, setOpenAuthForm] = useState(false);
  return (
    <section className="become-volunteer-section flex flex-col h-full w-full items-center justify-center py-32">
      <div className="flex flex-col h-full w-full p-2 md:w-3/5 lg:w-4/5 md:p-0 items-center gap-10">
        <h3 className="font-bold text-white">Become a member</h3>
        <p className="text-white max-w-xl leading-relaxed tracking-wide font-semibold">
          Join us as a member and make a direct impact on our initiatives.
          Whether it&apos;s tree planting, community clean-ups, or education
          programs, your dedication can make a real difference.
        </p>
        <Button
          variant={"default"}
          className="bg-teal-700 text-white px-10"
          onClick={() => {
            setOpenAuthForm(true);
          }}
        >
          Join Us
        </Button>
      </div>
      <AuthForm open={openAuthForm} close={setOpenAuthForm} />
    </section>
  );
}

export { BecomeVolunteer };
