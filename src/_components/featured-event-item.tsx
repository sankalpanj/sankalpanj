"use client";

import Image from "next/image";
import { EventDetail } from "./featured-events";

interface Props {
  eventDetail: EventDetail;
}

function RenderEventItem({
  eventDetail: { label, description, image },
}: Props) {
  return (
    <div className="flex flex-col h-auto w-auto rounded-lg hover:shadow-md bg-teal-500 gap-2">
      <Image
        alt="sample"
        src={image.src}
        width={image.width}
        height={image.height}
        className="rounded-lg object-cover h-3/6"
      />
      <div className="flex flex-col h-auto px-3 text-white rounded-b-lg gap-1">
        <p className="text-lg font-semibold">{label}</p>
        <p className="text-base text-white">{description}</p>
      </div>
    </div>
  );
}

export { RenderEventItem };
