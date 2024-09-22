import { FaMoneyBillWave, FaUniversity, FaPiggyBank, FaWallet } from "react-icons/fa"; // Font Awesome Icons
import { GiTakeMyMoney, GiPayMoney } from "react-icons/gi"; // Game Icons
import { MdAttachMoney, MdAccountBalance } from "react-icons/md"; // Material Design Icons
import { IconsPicker } from "~/@types/General";

export const icons:IconsPicker[] = [
    { name: "Money Bill", icon: <FaMoneyBillWave /> },
    { name: "Bank", icon: <FaUniversity /> },
    { name: "Piggy Bank", icon: <FaPiggyBank /> },
    { name: "Wallet", icon: <FaWallet /> },
    { name: "Taking Money", icon: <GiTakeMyMoney /> },
    { name: "Pay Money", icon: <GiPayMoney /> },
    { name: "Attach Money", icon: <MdAttachMoney /> },
    { name: "Account Balance", icon: <MdAccountBalance /> },
  ];