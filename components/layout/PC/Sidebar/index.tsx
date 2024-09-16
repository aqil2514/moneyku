import { AccountUser } from "~/@types/Auth";
import SidebarHeader from "./SidebarHeader";
import SidebarProvider from "./SidebarProvider";
import SidebarAccount from "./SidebarAccount";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";

export default function PCSidebar({ user }: { user: AccountUser | null }) {
  return (
    <SidebarProvider user={user}>
      <div className="bg-blue-500 min-h-screen p-4">
        <SidebarHeader />
        <SidebarAccount />
        <SidebarMenu />
        <SidebarFooter />
      </div>
    </SidebarProvider>
  );
}
