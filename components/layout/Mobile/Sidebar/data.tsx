import { AiOutlineTransaction } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { MdOutlineMoney } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import { TfiStatsUp } from "react-icons/tfi";

interface SidebarItem {
  to: string;
  icon: React.JSX.Element;
}

export const SidebarLinks: SidebarItem[] = [
  {
    to: "/transaction",
    icon: <AiOutlineTransaction style={{ fontSize: "24px" }} />,
  },
  {
    to: "/statistic",
    icon: <TfiStatsUp style={{ fontSize: "24px" }} />,
  },
  {
    to: "/assets",
    icon: <MdOutlineMoney style={{ fontSize: "24px" }} />,
  },
  {
    to: "/budgeting",
    icon: <TbMoneybag style={{ fontSize: "24px" }} />,
  },
  {
    to: "/setting",
    icon: <CiSettings style={{ fontSize: "24px" }} />,
  },
];
