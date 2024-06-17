import { useLocation } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import { AccountUser } from "~/@types/account";
import { exceptionPathName } from "~/root";
import PCSidebar from "../PC/Sidebar";
import MobileSidebar from "../Mobile/Sidebar";

export default function Sidebar({ user }: { user: AccountUser | null }) {
  const location = useLocation();
  const pathName = location.pathname;

  if (exceptionPathName.includes(pathName)) return <></>;

  return (
    <ClientOnly>
      {() => (
        <>
          <PCSidebar user={user} />
          <MobileSidebar user={user} />
        </>
      )}
    </ClientOnly>
  );
}


