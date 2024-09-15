import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import Typography from "components/General/Typography";
import Button from "components/Inputs/Button";
import { BiLogOut } from "react-icons/bi";
import { getUser } from "utils/server/account";
import { createContext, useContext } from "react";
import { AccountUser } from "~/@types/Account";
import { settingNavLink } from "../_setting.setting/setting-navlinks";
import Sidebar from "components/layout/Core/Sidebar";
import { authenticator } from "~/service/auth.server";

export const meta: MetaFunction = () => [{ title: "Setting | Moneyku" }];

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {failureRedirect:"/login"})

  const user = await getUser(request);

  return json({ user });
}

interface SettingContextState {
  user: AccountUser;
}

const SettingContext = createContext<SettingContextState>(
  {} as SettingContextState
);

export default function Setting() {
  const navigate = useNavigate();
  const loaderData = useLoaderData<typeof loader>();
  const { user } = loaderData;
  // Bikin Navlink di sini nanti. Lanjutin nanti
  return (
    <SettingContext.Provider value={{ user }}>
      <div className="sidebar-on">
        <Sidebar user={user} />
        <div className="main-page">
          <div id="setting-page" className="container-body">
            <div id="setting-page-nav" className="flex flex-col gap-2">
              <Typography
                align="center"
                family="merriweather-bold"
                variant="h1"
              >
                Pengaturan
              </Typography>
              {/* Styling di sini  */}
              {settingNavLink.map((nav, i) => (
                <NavLink
                  key={`nav-${i + 1}`}
                  to={nav.to}
                  replace
                  className={({ isActive }) =>
                    isActive
                      ? "setting-navbar setting-navbar-active no-underline"
                      : "setting-navbar no-underline"
                  }
                >
                  <div className="flex items-center">
                    {nav.icon}
                    <Typography
                      variant="p"
                      family="playfair-bold"
                      color="black"
                    >
                      {nav.text}
                    </Typography>
                  </div>
                </NavLink>
              ))}
              <div className="flex gap-1 my-4">
                <Button
                  color="error"
                  startIcon={<BiLogOut />}
                  onClick={() => navigate("/logout")}
                >
                  Logout
                </Button>
              </div>
            </div>
            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </SettingContext.Provider>
  );
}

export function useSettingData() {
  return useContext(SettingContext);
}
