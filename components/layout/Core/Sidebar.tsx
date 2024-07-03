import { ClientOnly } from "remix-utils/client-only";
import { AccountUser } from "~/@types/Account";
import PCSidebar from "../PC/Sidebar";
import MobileSidebar from "../Mobile/Sidebar";

export default function Sidebar({ user }: { user: AccountUser }) {

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


