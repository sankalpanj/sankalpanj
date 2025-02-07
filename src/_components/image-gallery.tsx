import Image from "next/image";

function ImageGallery() {
  return (
    <div className="container mx-auto px-5 py-2 lg:pr-32 lg:pt-24 w-3/5">
      <div className="-m-1 flex flex-wrap md:-m-2">
        <div className="flex w-1/2 flex-wrap">
          <div className="w-1/2 p-1 md:p-2">
            <Image
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src="/images/5kRun/5KRun_1.jpg"
              width={500}
              height={500}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <Image
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src="/images/preservation_work/Preservework2025_06.JPG"
              width={500}
              height={500}
            />
          </div>
          <div className="w-full p-1 md:p-2">
            <Image
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src="/images/foodDrive/FoodDrive2022_01.jpg"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="flex w-1/2 flex-wrap">
          <div className="w-full p-1 md:p-2">
            <Image
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src="/images/toyDrive/ToyDrive2024.jpg"
              width={500}
              height={500}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <Image
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src="/images/biodiversityImpvA.jpg"
              width={500}
              height={500}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <Image
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src="/images/biodiversity/biodiversity_a.jpeg"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export {ImageGallery}
