import { NavLink, useNavigate } from "@remix-run/react";
import { FiLogOut } from "react-icons/fi";
import { AccountUser } from "~/@types/Account";
import { SidebarLinks } from "./data";

export default function MobileSidebar({ user }: { user: AccountUser | null }) {
  const navigate = useNavigate();

  return (
    <>
      <div id="mobile-header">
        <h1 id="mobile-header-title" className="font-playfair-bold">
          Moneyku | {user?.username}
        </h1>
        <section
          id="mobile-header-logout"
          tabIndex={0}
          role="button"
          aria-hidden
          onClick={() => navigate("/logout")}
        >
          <FiLogOut />
          <p className="font-poppins-medium">Logout</p>
        </section>
      </div>
      <div id="mobile-sidebar">
        {SidebarLinks.map((item, i) => (
          <NavLink
            to={item.to}
            key={i++}
            replace
            className={({ isActive }) =>
              isActive
                ? "mobile-sidebar-container mobile-sidebar-active"
                : "mobile-sidebar-container mobile-sidebar-nonactive"
            }
          >
            <div>{item.icon}</div>
          </NavLink>
        ))}
      </div>
    </>
  );
}
