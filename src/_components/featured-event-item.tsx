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
    <div className="flex flex-col h-full w-auto rounded-lg hover:shadow-md bg-teal-500">
      <div className="flex grow w-full object-contain">
        <Image
          alt="sample"
          src={image.src}
          width={image.width}
          height={image.height}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col h-auto p-3 text-white rounded-b-lg pt-5 gap-3">
        <p className="text-lg font-semibold">{label}</p>
        <p className="text-base text-white">{description}</p>
      </div>
    </div>
  );
}

export { RenderEventItem };
