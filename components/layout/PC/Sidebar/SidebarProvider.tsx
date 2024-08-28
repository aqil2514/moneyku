import React, { createContext, useContext } from "react";
import { AccountUser } from "~/@types/Account";

interface SidebarProviderProps {
  user: AccountUser | null;
}

const SidebarProviderContext = createContext<SidebarProviderProps>(
  {} as SidebarProviderProps
);

export default function SidebarProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: AccountUser | null;
}) {
  return (
    <SidebarProviderContext.Provider value={{ user }}>
      {children}
    </SidebarProviderContext.Provider>
  );
}

export function useSidebarData(){
    return useContext(SidebarProviderContext)
}