"use-client";

import { MapPin } from "lucide-react";
import { ImageCarousel } from "./image-carousel";

export interface SocialEventProps {
  images: string[];
  label: string;
  description: string[];
  place: string;
}

function RenderSocialEventCard({
  images,
  label,
  description,
  place,
}: SocialEventProps) {
  if (description.length === 0) {
    return (
      <div className="flex flex-col h-auto w-full max-w-md rounded-lg p-2 bg-[#f9fafc] gap-3 border">
        <label
          htmlFor="event-label"
          className="font-semibold text-[#072366] mb-5"
        >
          {label}
        </label>
        <ImageCarousel images={images} />
        <div className="flex w-full justify-between items-center py-3">
          <div className="flex w-auto gap-1 items-center text-[#808080]">
            <MapPin className="text-inherit w-4 h-4" />
            <p className="text-sm">{place}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-auto w-full rounded-lg p-2 bg-[#f9fafc] gap-3 border">
      <div className="flex w-full gap-8">
        <ImageCarousel images={images} />
        <div className="flex flex-col">
          <label
            htmlFor="event-label"
            className="font-semibold text-[#072366] mb-5"
          >
            {label}
          </label>
          {description.map((desc, index) => (
            <p
              key={index}
              id="event-label"
              className="pt-2 text-base text-[#808080] leading-relaxed font-semibold"
            >
              {desc}
            </p>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-between items-center py-3">
        <div className="flex w-auto gap-1 items-center text-[#808080]">
          <MapPin className="text-inherit w-4 h-4" />
          <p className="text-sm">{place}</p>
        </div>
      </div>
    </div>
  );
}

export { RenderSocialEventCard };
