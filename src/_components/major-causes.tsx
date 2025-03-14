import { CASUE_ITEMS } from "@/lib/constants";
import Image, { StaticImageData } from "next/image";

export interface CauseItem {
  label: string;
  image: StaticImageData;
  description: string;
}

function RenderCauseItems({ label, image, description }: CauseItem) {
  return (
    <div className="flex flex-col h-5/6 w-full rounded-xl p-5  bg-[#f9fafc] hover:shadow-lg items-center justify-start transition-all duration-300 ease-linear delay-0 gap-3">
      <label htmlFor="" className="font-semibold align-top">
        {label}
      </label>
      <Image
        src={image}
        className="rounded-xl h-4/6 w-full object-fill"
        height={300}
        width={500}
        alt={label.toLowerCase()}
      />
      <p className="text-[#777777]">{description}</p>
    </div>
  );
}

function MajorCauses() {
  return (
    <section className="flex w-full h-full justify-center py-16 md:py-20">
      <div className="flex h-full w-full md:w-3/5 lg:w-4/5 p-2 md:p-0">
        <div className="flex flex-col h-full w-full gap-10 items-center">
          <h3 className="font-semibold">Our major causes</h3>
          <div className="flex flex-col md:flex-row w-full justify-between gap-5">
            {CASUE_ITEMS.map((cause, index) => {
              return (
                <RenderCauseItems
                  key={index}
                  label={cause.label}
                  description={cause.description}
                  image={cause.image}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export { MajorCauses };
