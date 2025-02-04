import fs from "fs";
import path from "path";
import { RenderSocialEventCard } from "../social-event";

export function getImagesFromDirectory(directoryName: string) {
  const publicDir = path.join(process.cwd(), `public/${directoryName}`);
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"];

  const files = fs.readdirSync(publicDir);

  const images = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  });

  return images.map((image) => `/${directoryName}/${image}`);
}

function PastEvents() {
  const picnicImages = getImagesFromDirectory("images/Picnic");
  const runImages = getImagesFromDirectory("images/5kRun");
  const fallSalesImages = getImagesFromDirectory("images/fallSales");
  const foodDriveImages = getImagesFromDirectory("images/foodDrive");
  const halloweenImages = getImagesFromDirectory("images/halloween");
  const lunchWithPoliceImages = getImagesFromDirectory(
    "images/lunch_with_police"
  );
  const preservationWork = getImagesFromDirectory("images/preservation_work");

  return (
    <div className="flex flex-col w-full h-full gap-8">
      <h3 className="text-2xl font-semibold text-[#072366]">Past Events</h3>
      <RenderSocialEventCard
        images={picnicImages}
        description={[
          `What better way to enjoy the sunshine than a Summer Picnic with Purpose? Sankalpa
organizes a day of fun, friendship, and environmental action!`,
          `Meet fellow environmental enthusiasts and strengthen our community. Learn how you can
contribute to sustainability efforts and become a part of our organization. Bring your friends,
share delicious food, and participate in eco-friendly activities that support our cause.Experience
the beauty we strive to protect while engaging in meaningful discussions about our initiatives.`,
          `Whether you're already involved or just curious, this is a great opportunity to relax, connect,
and make an impact. Come for the picnic, stay for the mission—because together, we can
create a greener, more sustainable future!`,
        ]}
        label="Community Annual Picnic 2024"
        place="Plainsboro, New Jersey"
      />
      <div className="grid grid-cols-3 w-full justify-between gap-y-5">
        <RenderSocialEventCard
          images={runImages}
          description={[]}
          label="Community 5K Run 2024"
          place="Plainsboro, New Jersey"
        />
        <RenderSocialEventCard
          images={fallSalesImages}
          description={[]}
          label="Fall Sales 2024"
          place="Plainsboro, New Jersey"
        />
        <RenderSocialEventCard
          images={foodDriveImages}
          description={[]}
          label="Food Drive 2024"
          place="Plainsboro, New Jersey"
        />
        <RenderSocialEventCard
          images={halloweenImages}
          description={[]}
          label="Halloween 2024"
          place="Plainsboro, New Jersey"
        />
        <RenderSocialEventCard
          images={lunchWithPoliceImages}
          description={[]}
          label="Lunch with TS Police"
          place="Plainsboro, New Jersey"
        />
        <RenderSocialEventCard
          images={preservationWork}
          description={[]}
          label="Preservation work"
          place="Plainsboro, New Jersey"
        />
      </div>
    </div>
  );
}

export { PastEvents };
