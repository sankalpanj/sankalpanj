import { EventDetail } from "@/_components/featured-events";
import { CauseItem } from "@/_components/major-causes";
import { VolunteerDetail } from "@/_components/volunteer";
import FvRunA from "../../public/images/5kRun/5KRun_1.jpg";
import BiodiversityImpvA from "../../public/images/biodiversity/biodiversity_a.jpeg";
import BiodiversityImpvB from "../../public/images/biodiversityImpvB.jpg";
import FoodDriveA from "../../public/images/foodDrive/FoodDrive2022_01.jpg";
import PicnicA from "../../public/images/Picnic/Picnic2021_1.jpg";
import ToyDriveA from "../../public/images/toyDrive/ToyDrive2021_01.jpg";
import TreePlantationA from "../../public/images/tree_plantation/tree_plantation_a.jpeg";
import { SocialEventProps } from "@/_components/social-event";

const CASUE_ITEMS: CauseItem[] = [
  {
    label: "Biodiversity Improvement",
    description:
      "At the heart of Sankalpa's mission lies a commitment to enriching ecosystems and fostering biodiversity. We believe that a balanced and diverse natural environment is essential for resilience, adaptability, and the well-being of all life forms.",
    image: BiodiversityImpvA,
  },
  {
    label: "Tree Plantation",
    description:
      "We planted over a 100 new trees and shrubs between two creek sites in our neighborhood in New Jersey which are experiencing severe erosion and a degrading habitat.",
    image: TreePlantationA,
  },
  {
    label: "Food Drives",
    description:
      "Our community food drive is a powerful initiative that brings neighbors together to support those in need. By collecting and donating non-perishable items, we are able to provide essential nourishment to families facing food insecurity.",
    image: FoodDriveA,
  },
];


const VOLUNTEER_ITEMS: VolunteerDetail[] = [
  {
    image: BiodiversityImpvB,
    brief:
      "sdflkjaslkfdjlsdja fljsdlfkjlsd jfsjdaljdskl fjsldkfjlsj dfjlsafjdljsdlkfjsdljf lksdjfl",
    designation: "CEO",
    firstName: "Test",
    lastName: "User",
    socialLinks: {
      facebook: "",
      linkedIn: "",
      twitter: "",
      youtube: "",
    },
  },
  {
    image: BiodiversityImpvB,
    brief:
      "sdflkjaslkfdjlsdja fljsdlfkjlsd jfsjdaljdskl fjsldkfjlsj dfjlsafjdljsdlkfjsdljf lksdjfl",
    designation: "CEO",
    firstName: "Test",
    lastName: "User",
    socialLinks: {
      facebook: "",
      linkedIn: "",
      twitter: "",
      youtube: "",
    },
  },
  {
    image: BiodiversityImpvB,
    brief:
      "sdflkjaslkfdjlsdja fljsdlfkjlsd jfsjdaljdskl fjsldkfjlsj dfjlsafjdljsdlkfjsdljf lksdjfl",
    designation: "CEO",
    firstName: "Test",
    lastName: "User",
    socialLinks: {
      facebook: "",
      linkedIn: "",
      twitter: "",
      youtube: "",
    },
  },
];

const FEATURED_EVENTS: EventDetail[] = [
  {
    image: FoodDriveA,
    amount: 0,
    description:
      "Our community food drive is a powerful initiative that brings neighbors together to support those in need.",
    donarsCount: 10,
    isContribution: true,
    isDonation: false,
    label: "Food Drive",
  },
  {
    image: ToyDriveA,
    amount: 0,
    description:
      "Our community toy drive is a wonderful way to bring joy and warmth to children during the holiday season.",
    donarsCount: 10,
    isContribution: true,
    isDonation: false,
    label: "Toy Drive 2021",
  },
  {
    image: FvRunA,
    amount: 0,
    description:
      "We have conducted several food drives for the Plainsboro Pantry with generous donations from our patrons.",
    donarsCount: 10,
    isContribution: true,
    isDonation: false,
    label: "5K Run 2024",
  },
  {
    image: PicnicA,
    amount: 0,
    description:
      "Our annual Summer Picnic is a fun-filled fundraising and meet-and-greet event that brings together both our current members and potential new ones.",
    donarsCount: 10,
    isContribution: true,
    isDonation: false,
    label: "Picnic 2021",
  },
];

export { CASUE_ITEMS, FEATURED_EVENTS, VOLUNTEER_ITEMS };
