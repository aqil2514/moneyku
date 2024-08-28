import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "components/ui/dialog";
import { useSidebarData } from "./SidebarProvider";
import { Profile } from "./Account";
import Button from "components/Inputs/Button";
import { useNavigate } from "@remix-run/react";

export default function SidebarAccount() {
  const { user } = useSidebarData();
  const navigate = useNavigate();
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="text-white border-4 border-double rounded-xl p-2 text-center mx-auto my-4">
          <p className="font-poppins-bold">
            {user && user.username ? user.username : "Belum buat"}
          </p>
        </div>
      </DialogTrigger>

      <DialogContent className="outline-8 outline-double outline-yellow-500">
        <Profile />
        <DialogFooter>
          <DialogClose>
            <Button color="error">Tutup</Button>
          </DialogClose>
            <Button color="info" onClick={() => navigate("/setting/profile")}>Edit Info</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
