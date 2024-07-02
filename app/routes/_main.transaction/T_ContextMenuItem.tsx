import { useNavigate } from "@remix-run/react";
import {
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuShortcut,
} from "components/ui/context-menu";
import { useCallback } from "react";

export default function T_ContextMenuItem() {
  const navigate = useNavigate();

  const addTransaction = useCallback(() => {
    navigate("/transaction/add");
  }, [navigate]);

  const reloadPage = () => {
    location.reload();
  };
  return (
    <>
      <ContextMenuLabel>General</ContextMenuLabel>
      <ContextMenuItem onSelect={reloadPage}>
        Reload
        <ContextMenuShortcut>CTRL + R</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuLabel>Transaction Menu</ContextMenuLabel>
      <ContextMenuItem onSelect={addTransaction}>
        Tambah Transaksi
        <ContextMenuShortcut>
            CTRL + B
        </ContextMenuShortcut>
      </ContextMenuItem>
    </>
  );
}
