import { FEATURED_EVENTS } from "@/lib/constants";
import { StaticImageData } from "next/image";
import { RenderEventItem } from "./featured-event-item";

export interface EventDetail {
  image: StaticImageData;
  label: string;
  description: string;
  isDonation: boolean;
  isContribution: boolean;
  amount: number;
  donarsCount: number;
}

function FeaturedEvents() {
  return (
    <section className="flex w-full h-full justify-center py-8 md:py-20">
      <div className="flex h-full w-full md:w-3/5 lg:w-4/5 p-2 md:p-0">
        <div className="flex flex-col h-full w-full gap-16 items-center">
          <h3 className="font-semibold">Featured Events</h3>
          <div className="grid gap-10 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {FEATURED_EVENTS.map((event, idx) => {
              return <RenderEventItem eventDetail={event} key={idx}/>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export { FeaturedEvents };
