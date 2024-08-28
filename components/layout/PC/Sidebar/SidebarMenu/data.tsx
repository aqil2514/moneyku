import React from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdOutlineMoney } from "react-icons/md";
import { SiPlangrid } from "react-icons/si";
import { TbMoneybag } from "react-icons/tb";
import { TfiStatsUp } from "react-icons/tfi";

interface NavLinkData {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export const navLinkData: NavLinkData[] = [
  {
    to: "/transaction",
    icon: <AiOutlineTransaction />,
    label: "Transaksi",
  },
  {
    to: "/statistic",
    icon: <TfiStatsUp />,
    label: "Statistik",
  },
  {
    to: "/assets",
    icon: <MdOutlineMoney />,
    label: "Aset",
  },
  {
    to: "/planning",
    icon: <SiPlangrid />,
    label: "Rencana",
  },
  {
    to: "/budgeting",
    icon: <TbMoneybag />,
    label: "Budgeting",
  },
];
