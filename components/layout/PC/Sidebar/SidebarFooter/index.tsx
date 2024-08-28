import { NavLink } from "@remix-run/react";
import { CiLight, CiSettings } from "react-icons/ci";
import { FaLanguage } from "react-icons/fa";
import { ACTIVE_NAVLINK, NONACTIVE_NAVLINK } from "../misc";

export default function SidebarFooter(){
    return(
        <div id="sidebar-footer">
          <h2 className="font-poppins underline text-2xl text-white font-bold">Setting</h2>
          <section className={NONACTIVE_NAVLINK}>
            <CiLight />
            <p className="font-poppins-medium">Light Mode</p>
          </section>
          <section className={NONACTIVE_NAVLINK}>
            <FaLanguage />
            <p className="font-poppins-medium">Bahasa</p>
          </section>
          <NavLink
            replace
            className={({ isActive }) =>
              isActive ? ACTIVE_NAVLINK : NONACTIVE_NAVLINK
            }
            to={"/setting"}
          >
            <CiSettings />
            <p className="font-poppins-medium">Setting</p>
          </NavLink>
        </div>
    )
}