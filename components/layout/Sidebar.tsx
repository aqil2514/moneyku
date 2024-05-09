import { useLocation } from "@remix-run/react";
import { AiOutlineTransaction } from "react-icons/ai";
import { CiLight } from "react-icons/ci";
import { FaLanguage } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineMoney } from "react-icons/md";
import { SiPlangrid } from "react-icons/si";
import { TbMoneybag } from "react-icons/tb";
import { TfiStatsUp } from "react-icons/tfi";
import { exceptionPathName } from "~/root";

export default function Sidebar() {
  const location = useLocation();
  const pathName = location.pathname;

  if (exceptionPathName.includes(pathName)) return <></>;

  return (
    <div id="sidebar">
      <div id="sidebar-header">
        <h1 id="sidebar-header-title">Money Management</h1>
        <img id="sidebar-header-image" src="/images/icon-money.png" alt="icon-money" />
      </div>
      <div id="sidebar-menu">
        <h2>Menu</h2>
        <section className="sidebar-list">
          <AiOutlineTransaction />
          <p>Transaksi</p>
        </section>
        <section className="sidebar-list">
          <TfiStatsUp />
          <p>Statistik</p>
        </section>
        <section className="sidebar-list">
          <MdOutlineMoney />
          <p>Aset</p>
        </section>
        <section className="sidebar-list">
          <SiPlangrid />
          <p>Rencana</p>
        </section>
        <section className="sidebar-list">
          <TbMoneybag />
          <p>Budgeting</p>
        </section>
      </div>
      <div id="sidebar-footer">
        <h2>Setting</h2>
        <section className="sidebar-list">
          <CiLight />
          <p>Light Mode</p> 
        </section>
        <section className="sidebar-list">
          <FaLanguage />
          <p>Bahasa</p> 
        </section>
        <section className="sidebar-list">
          <FiLogOut />
          <p>Logout</p>
        </section>
      </div>
    </div>
  );
}
