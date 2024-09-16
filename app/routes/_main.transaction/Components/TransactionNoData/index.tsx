import { ClientOnly } from "remix-utils/client-only";
import MainWrapper from "components/General/Container";
import TransactionNavbar from "../Navbar";
import AddDataDialog from "../DialogAddData";
import { MessageNoTransaction, Title } from "./components";

export default function TransactionNoData() {
  return (
    <ClientOnly>
      {() => (
        <MainWrapper className="p-4">
          <Title />
          <TransactionNavbar />
          <AddDataDialog />
          <MessageNoTransaction />
        </MainWrapper>
      )}
    </ClientOnly>
  );
}
