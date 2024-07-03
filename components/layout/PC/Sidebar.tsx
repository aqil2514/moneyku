import { NavLink, useNavigate } from "@remix-run/react";
import Typography from "components/General/Typography";
import Button from "components/Inputs/Button";
import { useState } from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import { CiLight, CiSettings } from "react-icons/ci";
import { FaLanguage } from "react-icons/fa";
import { MdOutlineMoney } from "react-icons/md";
import { SiPlangrid } from "react-icons/si";
import { TbMoneybag } from "react-icons/tb";
import { TfiStatsUp } from "react-icons/tfi";
import { AccountUser } from "~/@types/Account";

const Profile = ({
  user,
  setSeeProfile,
}: {
  user: AccountUser | null;
  setSeeProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  if (!user) throw new Error("Data user tidak ada");
  const { username, config, email } = user;
  const { language, currency, purposeUsage } = config;
  const mapLanguage: Record<AccountUser["config"]["language"], string> = {
    ID: "Bahasa Indonesia",
    EN: "English Language",
  };
  const mapCurrency: Record<AccountUser["config"]["currency"], string> = {
    EUR: "Belum dikembangkan",
    IDR: "Rupiah",
    USD: "Dolar",
  };

  return (
    <div id="profile" className="popup">
      <div className="popup-edit">
        <div className="border-double mb-4">
          <Typography variant="h1" family="playfair-bold" align="center">
            Profil Pengguna{" "}
          </Typography>
        </div>
        <div className="mb-4">
          <div className="flex gap-1">
            <Typography variant="str" family="poppins-bold">
              Nama Pengguna :{" "}
            </Typography>
            <Typography variant="p" family="poppins-medium">
              {username ? username : "Belum dibuat"}{" "}
            </Typography>
          </div>
          <div className="flex gap-1">
            <Typography variant="str" family="poppins-bold">
              Email :{" "}
            </Typography>
            <Typography variant="p" family="poppins-medium">
              {email ? email : "Belum dibuat"}{" "}
            </Typography>
          </div>
          <div className="flex gap-1">
            <Typography variant="str" family="poppins-bold">
              Preferensi Bahasa :{" "}
            </Typography>
            <Typography variant="p" family="poppins-medium">
              {language ? mapLanguage[language] : "Belum diatur"}{" "}
            </Typography>
          </div>
          <div className="flex gap-1">
            <Typography variant="str" family="poppins-bold">
              Preferensi Mata Uang :{" "}
            </Typography>
            <Typography variant="p" family="poppins-medium">
              {currency ? mapCurrency[currency] : "Belum diatur"}{" "}
            </Typography>
          </div>
          <div className="flex gap-1">
            <Typography variant="str" family="poppins-bold">
              Tujuan Penggunaan :{" "}
            </Typography>
            <Typography variant="p" family="poppins-medium">
              {purposeUsage ? purposeUsage : "Belum diatur"}{" "}
            </Typography>
          </div>
        </div>
        <div id="profile-footer" className="flex gap-1">
          <Button color="primary" onClick={() => setSeeProfile(false)}>
            Tutup
          </Button>
          <Button
            color="success"
            onClick={() => navigate("/setting/profile", { replace: true })}
          >
            Edit Profil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function PCSidebar({ user }: { user: AccountUser | null }) {
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
            to={"/budgeting"}
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
          <NavLink
            replace
            className={({ isActive }) =>
              isActive ? "sidebar-list sidebar-list-active" : "sidebar-list"
            }
            to={"/setting"}
          >
            <CiSettings />
            <p className="font-poppins-medium">Setting</p>
          </NavLink>
        </div>
      </div>
      {seeProfile && <Profile user={user} setSeeProfile={setSeeProfile} />}
    </>
  );
}
