
import { CauseItem } from "@/_components/major-causes";
import FvRunA from "../../public/images/5kRun/5KRun_1.jpg";
import BiodiversityImpvA from "../../public/images/biodiversityImpvA.jpg";
import BiodiversityImpvB from "../../public/images/biodiversityImpvB.jpg";
import BiodiversityImpvC from "../../public/images/biodiversityImpvC.jpg";
import FoodDriveA from "../../public/images/foodDrive/FoodDrive2022_01.jpg";
import PicnicA from "../../public/images/Picnic/Picnic2021_1.jpg";
import ToyDriveA from "../../public/images/toyDrive/ToyDrive2021_01.jpg";
import { VolunteerDetail } from "@/_components/volunteer";
import { EventDetail } from "@/_components/featured-events";

const CASUE_ITEMS: CauseItem[] = [
  {
    label: "Biodiversity Improvement",
    description:
      "We worked with the Mercer County in our neighborhood to remove invasive plants from Rosedale Park and The Plainsboro PreserveInvasive plant species are non-native plants that do not meet the needs of the animals, and reduce the overall biodiversity of the habitat.",
    image: BiodiversityImpvB,
  },
  {
    label: "Tree Plantation",
    description:
      "We planted over a 100 new trees and shrubs between two creek sites in our neighborhood in New Jersey which are experiencing severe erosion and a degrading habitat.",
    image: BiodiversityImpvA,
  },
  {
    label: "Food Drives",
    description:
      "We have conducted several food drives for the Plainsboro Pantry with generous donations from our patrons.",
    image: BiodiversityImpvC,
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
      "We have conducted several food drives for the Plainsboro Pantry with generous donations from our patrons.",
    donarsCount: 10,
    isContribution: true,
    isDonation: false,
    label: "Food Drive",
  },
  {
    image: ToyDriveA,
    amount: 0,
    description:
      "We have conducted several food drives for the Plainsboro Pantry with generous donations from our patrons.",
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
      "We have conducted several food drives for the Plainsboro Pantry with generous donations from our patrons.",
    donarsCount: 10,
    isContribution: true,
    isDonation: false,
    label: "Picnic 2021",
  },
];

export { CASUE_ITEMS, FEATURED_EVENTS, VOLUNTEER_ITEMS };
