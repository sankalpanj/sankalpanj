import { PastEvents } from "@/_components/events/past-events";
import { UpcomingEvents } from "@/_components/events/upcoming-events";
import { CloudDownload, Hourglass, TreePalm, Trees } from "lucide-react";

interface StatProps {
  label: string;
  value: string;
  icon: JSX.Element;
}

function RenderStats({ label, value, icon }: StatProps) {
  return (
    <div className="flex w-full md:w-1/4 lg:w-1/4 gap-5 justify-center items-center border-r px-5">
      <div className="flex flex-col h-auto w-auto gap-1">
        <h3 className="font-semibold">{value}</h3>
        <label htmlFor={label} className="text-base font-semibold">
          {label}
        </label>
      </div>
      {icon}
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <div className="flex flex-col grow w-full justify-center items-center">
        <div className="flex flex-col w-full h-full bg-[#4867d6] justify-end items-center">
          <h1 className="font-semibold text-white pb-4 pt-28">Social Events</h1>
        </div>
        <div className="flex w-full min-h-32 items-center justify-around bg-teal-500 text-white shadow-md">
          <div className="flex w-full md:w-3/5 lg:w-4/5 h-full justify-center items-center">
            <RenderStats
              label="Planted Trees"
              value="350"
              icon={<Trees color="#f7f8f7" width={50} height={50} />}
            />
            <RenderStats
              label="Tonnes of CO2 being offset"
              value="315.00"
              icon={<CloudDownload color="#f7f8f7" width={50} height={50} />}
            />
            <RenderStats
              label="Country reforested"
              value="1"
              icon={<TreePalm color="#f7f8f7" width={50} height={50} />}
            />
            <RenderStats
              label="Working hours created"
              value="43.75"
              icon={<Hourglass color="#f7f8f7" width={50} height={50} />}
            />
          </div>
        </div>
        <div className="flex flex-col h-auto py-28 items-center">
          <h2 className="font-semibold text-[#072366]">
            We arrange many social events for the community
          </h2>
        </div>
        <div className="flex flex-col gap-8 h-full w-full md:w-3/5 lg:w-4/5 pb-28">
          <UpcomingEvents />
          <PastEvents />
        </div>
      </div>
    </main>
  );
}
