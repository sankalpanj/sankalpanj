"use client";

import RenderMemberDetail from "@/_components/member-detail";
import { MembershipForm } from "@/_components/membership-form";
import { Button } from "@/components/ui/button";
import { MEMBERS } from "@/lib/constants";
import { useState } from "react";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <main className="flex flex-col min-h-screen w-full items-center">
      <div className="h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="flex flex-col w-full grow gap-10 items-center my-28">
          <h3 className="font-semibold">Meet our members</h3>
          <Button onClick={() => setOpenModal(true)}>Become a member</Button>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full md:w-3/4 xl:w-3/4 h-full gap-5 place-items-center py-4 my-2">
            {MEMBERS.map((member, idx) => {
              return <RenderMemberDetail key={idx} member={member} />;
            })}
          </div>
        </div>
      </div>
      <MembershipForm open={openModal} close={setOpenModal} />
    </main>
  );
}
