import Image from "next/image";
import TeamA from "../../public/images/teamA.jpg";
import { Button } from "./ui/button";

function About() {
  return (
    <section className="flex flex-col h-full w-full items-center pb-14 md:pb-28">
      <div className="flex flex-col md:relative h-full w-full md:w-3/5 lg:w-4/5 p-0 gap-3 md:gap-0">
        <div className="flex w-full md:w-2/4 min-h-96 z-10">
          <Image
            src={TeamA.src}
            width={TeamA.width}
            height={TeamA.height}
            alt="team-a"
            className="rounded-lg"
          />
        </div>
        <div className="flex md:absolute w-full md:w-3/5 h-auto md:min-h-full border rounded-lg md:right-1 md:top-8 bg-white justify-center items-center p-10 md:p-28 md:pl-44 shadow-md">
          <div className="flex flex-col grow w-full gap-5">
            <h3 className="font-semibold">We are nonprofit team</h3>
            <p className="leading-normal text-[#777777]">
              At Sankalpa, our mission is simple: to serve the community and
              protect our environment. We are a passionate group of individuals
              who believe in the power of collective action. Our initiatives are
              designed to promote biodiversity, reduce plastic usage, and create
              a better world for all.
            </p>
            <Button variant={"secondary"}>Learn more</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { About };
