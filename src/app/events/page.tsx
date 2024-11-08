import { RenderSocialEventCard } from "@/_components/social-event";
import Event from "../../../public/images/Picnic/Picnic2021_1.jpg";

interface StatProps {
  label: "Donation" | "Events" | "Participants" | "Donars";
  value: string;
}

function RenderStats({ label, value }: StatProps) {
  return (
    <div className="flex flex-col h-auto w-auto gap-1">
      <h3 className="font-semibold">{value}</h3>
      <label htmlFor={label}>{label}</label>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <div className="flex flex-col grow w-full justify-center items-center">
        <div className="flex flex-col w-full h-full bg-[#4867d6] justify-end items-center">
          <h1 className="font-semibold text-white pb-4">Social Events</h1>
        </div>
        <div className="flex w-full min-h-32 items-center justify-around bg-teal-500 text-white shadow-md">
          <RenderStats label="Donation" value="6000 +" />
          <RenderStats label="Events" value="250 +" />
          <RenderStats label="Participants" value="8000 +" />
          <RenderStats label="Donars" value="300" />
        </div>
        <div className="flex flex-col h-auto py-28 items-center">
          <h2 className="font-semibold text-[#072366]">
            We arrange many social events for charity donations
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 h-full w-full md:w-3/5 lg:w-4/5 pb-28">
          <RenderSocialEventCard
            image={Event}
            dateTime="12/08/2023 | 10:30 pm"
            description=""
            label="Picnic"
            place="Dallas, Texas"
          />
          <RenderSocialEventCard
            image={Event}
            dateTime="12/08/2023 | 10:30 pm"
            description=""
            label="5k Run"
            place="NY, New Jersey"
          />
          <RenderSocialEventCard
            image={Event}
            dateTime="12/08/2023 | 10:30 pm"
            description=""
            label="Food drive"
            place="Dallas, Texas"
          />
        </div>
      </div>
    </main>
  );
}
