import { Button } from "@/_components/ui/button";
import Image from "next/image";
import "../globals.css";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full relative">
      <div className="flex donation-container grow w-full relative" />
      <div className="flex grow w-full bg-white" />
      <div className="absolute flex h-full w-full max-w-5xl items-center justify-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="flex h-3/5 grow gap-5 items-start">
          <div className="flex flex-col h-auto w-full gap-10">
            <h3 className="text-white pt-14 leading-tight">
              Support Diversity, Empower Change
            </h3>
            <ul className="list-disc px-10 text-white">
              <li>
                Your contribution today helps us create a more inclusive and
                diverse tomorrow.
              </li>
              <li className="pt-3">
                Every donation makes a difference in fostering equity and
                opportunities for all.
              </li>
              <li className="pt-3">
                Join us in our mission to celebrate and uplift diverse voices.
              </li>
            </ul>
            <div>
              <Button variant={"default"}>Donate</Button>
            </div>
          </div>
          <Image
            src={"/images/plantation.png"}
            width={500}
            className="drop-shadow-xl"
            height={500}
            alt="donation"
          />
        </div>
      </div>
    </main>
  );
}
