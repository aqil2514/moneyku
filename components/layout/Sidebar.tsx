import { NavLink, useLocation, useNavigate } from "@remix-run/react";
import { AiOutlineTransaction } from "react-icons/ai";
import { CiLight } from "react-icons/ci";
import { FaLanguage } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdFeaturedPlayList, MdOutlineMoney } from "react-icons/md";
import { SiPlangrid } from "react-icons/si";
import { TbMoneybag } from "react-icons/tb";
import { TfiStatsUp } from "react-icons/tfi";
import { AccountDB } from "~/@types/account";
import { exceptionPathName } from "~/root";

export default function Sidebar({ user }: { user: AccountDB | null }) {
  const location = useLocation();
  const pathName = location.pathname;

  if (exceptionPathName.includes(pathName)) return <></>;

  return (
    <>
      <PCSidebar user={user} />
      <MobileSidebar user={user} />
    </>
  );
}

function PCSidebar({ user }: { user: AccountDB | null }) {
  const navigate = useNavigate();
  return (
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
      <div id="account" className="font-poppins-bold">
        {user?.username}
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
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MobileSidebar({ user }: { user: AccountDB | null }) {
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
