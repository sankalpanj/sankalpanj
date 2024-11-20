import { LoaderCircleIcon } from "lucide-react";
import React from "react";

interface Props {
  loading: boolean;
  message?: string;
  indicator?: React.ReactNode;
}

function OverlayLoader({
  loading,
  message,
  indicator = <LoaderCircleIcon className="animate-spin" size={50} />,
}: Props) {
  if (!loading) return null;
  return (
    <div className="absolute inset-0 rounded-md flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-25 rounded-md"></div>
      <div className="relative flex flex-col items-center justify-center">
        {indicator}
        {message && <p className="font-bold mt-2">{message}</p>}
      </div>
    </div>
  );
}

export { OverlayLoader };
