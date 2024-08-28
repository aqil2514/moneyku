import { useSidebarData } from "../SidebarProvider";
import { profileDataArray } from "./data";

export const Profile = () => {
  const { user } = useSidebarData();
  if (!user) throw new Error("Data user tidak ada");
  const { username, config, email } = user;
  const userData = profileDataArray(username, config, email);

  return (
    <div className="p-2">
      <div className="border-4 border-double mb-4 rounded-sm">
        <h1 className="font-playfair-display text-center">Profil Pengguna </h1>
      </div>
      {userData.map((data, i) => (
        <div className="flex gap-1" key={i}>
          <strong>{data.key} </strong>
          <p>{data.value} </p>
        </div>
      ))}
    </div>
  );
};
