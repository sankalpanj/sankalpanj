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
    <div className="flex flex-col w-full gap-5 object-contain justify-start">
      <Image
        alt={label}
        src={image.src}
        width={image.width}
        height={300}
        className="w-full max-w-xl h-3/5 rounded-lg"
      />
      <div className="flex flex-col grow px-3 rounded-b-lg gap-5">
        <p className="text-xl font-semibold">{label}</p>
        <p className="text-base h-full max-h-fit truncate max-w-md line-clamp-5 text-wrap">
          {description}
        </p>
      </div>
    </div>
  );
}

export { RenderEventItem };
