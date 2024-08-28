import { NavLink } from "@remix-run/react";
import { navLinkData } from "./data";
import { ACTIVE_NAVLINK, NONACTIVE_NAVLINK } from "../misc";

export default function SidebarMenu() {
  return (
    <div id="sidebar-menu">
      <h2 className="text-white text-2xl font-bold font-poppins">Menu</h2>
      {navLinkData.map((data, i) => (
        <NavLink
          to={data.to}
          replace
          className={({ isActive }) =>
            isActive ? ACTIVE_NAVLINK : NONACTIVE_NAVLINK
          }
          key={i}
        >
          {data.icon}
          <p className="font-poppins">{data.label}</p>
        </NavLink>
      ))}
    </div>
  );
}
