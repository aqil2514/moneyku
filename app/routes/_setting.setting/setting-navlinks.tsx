import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaPalette } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";

interface SettingNavlinkProps{
    to: string;
    text:string;
    icon: React.ReactNode;
}

export const settingNavLink:SettingNavlinkProps[] =[
    {
        to:"/setting/profile",
        text:"Profile",
        icon: <CgProfile className="my-auto mr-1 text-black" />
    },
    {
        to:"/setting/security",
        text:"Keamanan",
        icon: <MdOutlineSecurity className="my-auto mr-1 text-black" />
    },
    {
        to:"/setting/theme",
        text:"Tema",
        icon: <FaPalette className="my-auto mr-1 text-black" />
    },
]