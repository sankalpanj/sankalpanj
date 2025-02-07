
import Image, { StaticImageData } from "next/image";

export interface VolunteerDetail {
  firstName: string;
  lastName: string;
  designation: string;
  image: StaticImageData;
  brief: string;
  socialLinks: {
    facebook: string;
    linkedIn: string;
    twitter: string;
    youtube: string;
  };
}

function RenderVolunteerCard({
  image,
  firstName,
  lastName,
  designation,
  brief,
}: VolunteerDetail) {
  return (
    <div className="group flex flex-col w-full items-center h-auto rounded-lg">
      <Image
        src={image.src}
        alt="user-img"
        width={image.width}
        height={image.height}
        className="rounded-t-lg"
      />
      <div className="flex flex-col h-full w-full p-5 items-center gap-3">
        <label htmlFor="" className="group-hover:text-teal-600 font-semibold">
          {firstName} {lastName}
        </label>
        <p className="text-[#777777]">{designation}</p>
        <p className="text-[#777777] break-words">{brief}</p>
      </div>
    </div>
  );
}

function Volunteer() {
  return (
    <section className="flex bg-[#f9fafc] w-full h-full py-20 justify-center">
      <div className="flex flex-col h-full w-full p-2 md:w-3/5 lg:w-4/5 md:p-0 items-center gap-10">
        <h3 className="font-semibold">Meet Our Volunteers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* {VOLUNTEER_ITEMS.map((item, index) => {
            return (
              <RenderVolunteerCard
                key={index}
                brief={item.brief}
                designation={item.designation}
                firstName={item.firstName}
                lastName={item.lastName}
                socialLinks={{ ...item.socialLinks }}
                image={item.image}
              />
            );
          })} */}
        </div>
      </div>
    </section>
  );
}

export { Volunteer };
