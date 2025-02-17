import { EventDetail } from "@/_components/featured-events";
import { CauseItem } from "@/_components/major-causes";
import FvRunA from "../../public/images/5kRun/5KRun_1.jpg";
import BiodiversityImpvA from "../../public/images/biodiversity/biodiversity_a.jpeg";
import FoodDriveA from "../../public/images/foodDrive/FoodDrive2022_01.jpg";
import PicnicA from "../../public/images/Picnic/Picnic2024.jpg";
import ToyDriveA from "../../public/images/toyDrive/ToyDrive2024.jpg";
import TreePlantationA from "../../public/images/tree_plantation/tree_plantation_a.jpeg";

export interface Member {
  name: string;
  designation: string;
  imageSrc: string;
}

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
    description: `
      Like every year, Sankalpa proudly hosted its annual Toy Drive, spreading joy and hope to children in need. 
      During this special holiday season, we invite our wonderful community to come together and make a difference. 
      By donating new, unwrapped toys, you can bring happiness to a child who deserves to feel special and cherished. 
      With the support of generous neighbors and kind-hearted individuals, we continue to brighten the season for countless 
      children—because every child deserves the magic of play!
    `,
    donarsCount: 10,
    isContribution: true,
    isDonation: false,
    label: "Toy Drive 2024",
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
    description: `What better way to enjoy the sunshine than a Summer Picnic with Purpose? Sankalpa
organizes a day of fun, friendship, and environmental action!
Meet fellow environmental enthusiasts and strengthen our community. Learn how you can
contribute to sustainability efforts and become a part of our organization. Bring your friends,
share delicious food, and participate in eco-friendly activities that support our cause.Experience
the beauty we strive to protect while engaging in meaningful discussions about our initiatives.
Whether you're already involved or just curious, this is a great opportunity to relax, connect,
and make an impact. Come for the picnic, stay for the mission—because together, we can
create a greener, more sustainable future!`,
    donarsCount: 10,
    isContribution: true,
    isDonation: false,
    label: "Picnic 2024",
  },
];

const MEMBERS: Member[] = [
  {
    name: "Anamika Banerjee",
    designation: "President",
    imageSrc: "/images/members/anmk_bnj_presd.jpeg",
  },
  {
    name: "Nemai Ghosh",
    designation: "Vice President & Treasurer",
    imageSrc: "/images/members/ng_vp_t.jpeg",
  },
  {
    name: "Bishakha Ghoshal",
    designation: "Secretary",
    imageSrc: "/images/members/bisakha.jpeg",
  },
  {
    name: "Mahua Chakraborti",
    designation: "Assistant Secretary",
    imageSrc: "/images/members/AssistantSecetary_MahuaChakraborti.jpeg",
  },
  {
    name: "Venky Neelakantan",
    designation: "Chief Environmental Officer",
    imageSrc: "/images/members/vkn_chief_env_of.jpeg",
  },
  {
    name: "Rini Ganguly",
    designation: "Advisor",
    imageSrc: "/images/members/rg_adv.jpeg",
  },
  {
    name: "Shantanu Dev",
    designation: "Advisor",
    imageSrc: "/images/members/sh_dev.jpeg",
  },
  {
    name: "Shantanu Raha",
    designation: "Advisor",
    imageSrc: "/images/members/Advisor_SantanuRaha.jpeg",
  },
  {
    name: "Ajit Parhi",
    designation: "Member",
    imageSrc: "/images/members/aj_ph.jpeg",
  },
  {
    name: "Anjanita Das",
    designation: "Member",
    imageSrc: "/images/members/Member_AnjanitaDas.jpeg",
  },
  {
    name: "Ayona Biswas",
    designation: "Member",
    imageSrc: "/images/members/ay_bsw.jpeg",
  },
  {
    name: "Biswajit Santra",
    designation: "Member",
    imageSrc: "/images/members/bs_snt.jpeg",
  },
  {
    name: "Deepshikha Ghosh",
    designation: "Member",
    imageSrc: "/images/members/deepshikha_member.jpeg",
  },
  {
    name: "Chaiti Banerjee",
    designation: "Member",
    imageSrc: "/images/members/ChaitaiBanerjee.jpeg",
  },
  {
    name: "Gangotri Dey",
    designation: "Member",
    imageSrc: "/images/members/Gng_dey.jpeg",
  },
  {
    name: "Jaya Chakrabarti",
    designation: "Member",
    imageSrc: "/images/members/jaya.jpeg",
  },
  {
    name: "Kakoli Bhattacharyya",
    designation: "Member",
    imageSrc: "/images/members/Member_Kakoli_Bhattacharyya.jpeg",
  },
  {
    name: "Koustav Ghosal",
    designation: "Member",
    imageSrc: "/images/members/kv_gh.jpeg",
  },
  {
    name: "Koyeli Mukherjee",
    designation: "Member",
    imageSrc: "/images/members/Member_KoyeliMukherjee.jpeg",
  },
  {
    name: "Manas Bhattacharyya",
    designation: "Member",
    imageSrc: "/images/members/Member_ManasBhattacharyya.jpeg",
  },
  {
    name: "Reetesh Ghosh",
    designation: "Member",
    imageSrc: "/images/members/reeteshghosh_member.jpeg",
  },
  {
    name: "Somak Bhattacharya",
    designation: "Member",
    imageSrc: "/images/members/SomakBhattacharya.jpeg",
  },
  {
    name: "Sukanya Ghosh",
    designation: "Member",
    imageSrc: "/images/members/sk_gh.jpeg",
  },
  {
    name: "Suvendra Chakrabarti",
    designation: "Member",
    imageSrc: "/images/members/suvendra.jpeg",
  },
  {
    name: "Uma Venkateswaran",
    designation: "Member",
    imageSrc: "/images/members/UmaVenkateswaran.jpeg",
  },
];

export { CASUE_ITEMS, FEATURED_EVENTS, MEMBERS };
