import Image from "next/image";
import Link from "next/link";
import React from "react";

const LatestEvent: React.FC = () => {
  return (
    <div className="absolute h-20 bg-blue-300 transition-all delay-200 top-0 right-0 mt-28 z-50 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border-none rounded-tl-lg rounded-bl-lg shadow-lg p-3">
      <Link className="flex w-full gap-5" href={"/events"}>
        <Image
          src={"/images/5kRun/logo.png"}
          width={50}
          height={50}
          alt="5k-run"
        />
        <div className="flex flex-col gap-1">
          <p className="text-lg font-bold text-white">Upcoming event</p>
          <p className="text-base font-semibold text-white">5K Run/ 2K Walk</p>
        </div>
      </Link>
    </div>
  );
};

export default LatestEvent;
