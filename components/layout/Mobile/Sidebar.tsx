import { NavLink, useNavigate } from "@remix-run/react";
import { AiOutlineTransaction } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { MdFeaturedPlayList, MdOutlineMoney } from "react-icons/md";
import { TfiStatsUp } from "react-icons/tfi";
import { AccountUser } from "~/@types/account";

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
          <NavLink
            to={"/transaction"}
            replace
            className={({ isActive }) =>
              isActive
                ? "mobile-sidebar-container mobile-sidebar-active"
                : "mobile-sidebar-container mobile-sidebar-nonactive"
            }
          >
            <AiOutlineTransaction />
            <p>Transaksi</p>
          </NavLink>
          <NavLink
            to={"/statistic"}
            replace
            className={({ isActive }) =>
              isActive
                ? "mobile-sidebar-container mobile-sidebar-active"
                : "mobile-sidebar-container mobile-sidebar-nonactive"
            }
          >
            <TfiStatsUp />
            <p>Statisik</p>
          </NavLink>
          <NavLink
            to={"/assets"}
            replace
            className={({ isActive }) =>
              isActive
                ? "mobile-sidebar-container mobile-sidebar-active"
                : "mobile-sidebar-container mobile-sidebar-nonactive"
            }
          >
            <MdOutlineMoney />
            <p>Aset</p>
          </NavLink>
          <div
            className="mobile-sidebar-container mobile-sidebar-nonactive"
            onClick={() => alert("Belum berfungsi")}
            onKeyDown={(e) => {
              if (e.key === "Enter") return alert("belum berfungsi");
            }}
            role="button"
            tabIndex={0}
          >
            <MdFeaturedPlayList />
            <p>Fitur Lain</p>
          </div>
          {/* <NavLink
            to={"budgeting"}
            replace
            className={({ isActive }) =>
              isActive ? "mobile-sidebar-container mobile-sidebar-active" : "mobile-sidebar-container mobile-sidebar-nonactive"
            }
          >
            <TbMoneybag />
            <p>Budgeting</p>
          </NavLink> */}
        </div>
      </>
    );
  }
  