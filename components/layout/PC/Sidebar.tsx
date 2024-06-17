import { NavLink, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import { CiLight } from "react-icons/ci";
import { FaLanguage } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineMoney } from "react-icons/md";
import { SiPlangrid } from "react-icons/si";
import { TbMoneybag } from "react-icons/tb";
import { TfiStatsUp } from "react-icons/tfi";
import { AccountUser } from "~/@types/account";

export default function PCSidebar({ user }: { user: AccountUser | null }) {
    const navigate = useNavigate();
    const [seeProfile, setSeeProfile] = useState<boolean>(false);
    return (
      <>
        <div id="sidebar">
          <div id="sidebar-header">
            <h1 id="sidebar-header-title" className="font-playfair-bold">
              Moneyku
            </h1>
            {/* <img
            id="sidebar-header-image"
            src="/images/icon-money.png"
            alt="icon-money"
          /> */}
          </div>
          <div id="account">
            <div
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSeeProfile(true);
                }
              }}
              onClick={() => setSeeProfile(true)}
            >
              <p className="font-poppins-bold">
                {user && user.username ? user.username : "Belum buat"}
              </p>
            </div>
          </div>
          <div id="sidebar-menu">
            <h2>Menu</h2>
            <NavLink
              to={"/transaction"}
              replace
              className={({ isActive }) =>
                isActive ? "sidebar-list sidebar-list-active" : "sidebar-list"
              }
            >
              <AiOutlineTransaction />
              <p className="font-poppins-medium">Transaksi</p>
            </NavLink>
            <NavLink
              to={"/statistic"}
              replace
              className={({ isActive }) =>
                isActive ? "sidebar-list sidebar-list-active" : "sidebar-list"
              }
            >
              <TfiStatsUp />
              <p className="font-poppins-medium">Statistik</p>
            </NavLink>
            <NavLink
              to={"/assets"}
              replace
              className={({ isActive }) =>
                isActive ? "sidebar-list sidebar-list-active" : "sidebar-list"
              }
            >
              <MdOutlineMoney />
              <p className="font-poppins-medium">Aset</p>
            </NavLink>
            <NavLink
              to={"/planning"}
              replace
              className={({ isActive }) =>
                isActive ? "sidebar-list sidebar-list-active" : "sidebar-list"
              }
            >
              <SiPlangrid />
              <p className="font-poppins-medium">Rencana</p>
            </NavLink>
            <NavLink
              to={"budgeting"}
              replace
              className={({ isActive }) =>
                isActive ? "sidebar-list sidebar-list-active" : "sidebar-list"
              }
            >
              <TbMoneybag />
              <p className="font-poppins-medium">Budgeting</p>
            </NavLink>
          </div>
          <div id="sidebar-footer">
            <h2>Setting</h2>
            <section className="sidebar-list">
              <CiLight />
              <p className="font-poppins-medium">Light Mode</p>
            </section>
            <section className="sidebar-list">
              <FaLanguage />
              <p className="font-poppins-medium">Bahasa</p>
            </section>
            <section
              className="sidebar-list"
              tabIndex={0}
              role="button"
              aria-hidden
              onClick={() => navigate("/logout")}
            >
              <FiLogOut />
              <p className="font-poppins-medium">Logout</p>
            </section>
          </div>
        </div>
        {seeProfile && <div className="popup"></div>}
      </>
    );
  }