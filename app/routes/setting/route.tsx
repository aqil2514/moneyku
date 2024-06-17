import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { NavLink, useLoaderData, useNavigate } from "@remix-run/react";
import Typography from "components/General/Typography";
import Button from "components/Inputs/Button";
import { BiLogOut } from "react-icons/bi";
import { getUser } from "utils/account";
import ProfileSetting from "./Profile";
import { createContext, useContext } from "react";
import { AccountUser } from "~/@types/account";

export const meta: MetaFunction = () => [{ title: "Setting | Moneyku" }];

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);

  if (!user) throw new Error("User tidak ditemukan");

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
      <div className="main-page">
        <div id="setting-page" className="container-body">
          <div id="setting-page-nav">
            <Typography align="center" family="merriweather-bold" variant="h1">
              Pengaturan
            </Typography>
            <div className="setting-navbar">
              <NavLink
                to={"/setting/profile"}
                replace
                className={({ isActive }) =>
                  isActive ? "" : ""
                }
              >
                <Typography variant="p" family="playfair-bold">
                  Profile
                </Typography>
              </NavLink>
            </div>
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
          <ProfileSetting />
        </div>
      </div>
    </SettingContext.Provider>
  );
}

export function useSettingData() {
  return useContext(SettingContext);
}
