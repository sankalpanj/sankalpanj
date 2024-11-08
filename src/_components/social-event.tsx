"use-client";

import { CalendarDays, Clock2, MapPin } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface SocialEventProps {
  image: StaticImageData;
  label: string;
  description: string;
  dateTime: string;
  place: string;
}

function RenderSocialEventCard({
  image,
  label,
  description,
  dateTime,
  place,
}: SocialEventProps) {
  const [date, time] = dateTime.split("|");
  return (
    <Link href={"/"}>
      <div className="h-auto w-full rounded-lg p-2 bg-[#f9fafc] hover:shadow-lg transition-all duration-300 ease-linear delay-0">
        <Image
          src={image.src}
          alt="event-img"
          className="float-left w-2/5 h-auto object-cover rounded-md mr-2"
        />
        <label htmlFor="event-label" className="font-semibold text-[#072366]">
          {label}
        </label>
        <p
          id="event-label"
          className="pt-2 text-sm text-[#808080] leading-relaxed"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          blanditiis illum similique saepe voluptatibus, dolor laboriosam quo
          rem temporibus eum assumenda esse maiores praesentium ducimus autem
          officiis sit laudantium dolore.
        </p>
        <div className="flex w-full justify-between items-center py-3">
          <div className="flex w-auto gap-1 items-center text-[#808080]">
            <Clock2 className="text-inherit w-4 h-4" />
            <p className="text-sm">{time}</p>
          </div>
          <div className="flex w-auto gap-1 items-center text-[#808080]">
            <CalendarDays className="text-inherit w-4 h-4" />
            <p className="text-sm">{date}</p>
          </div>
          <div className="flex w-auto gap-1 items-center text-[#808080]">
            <MapPin className="text-inherit w-4 h-4" />
            <p className="text-sm">{place}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export { RenderSocialEventCard };
