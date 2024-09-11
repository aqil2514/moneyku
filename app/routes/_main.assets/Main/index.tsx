import MainWrapper from "components/General/Container";
import { MainBody, MainHeader } from "./components";
import MainProvider from "./MainProvider";

export default function MainPage() {
  // Referensi UI : https://cdn.dribbble.com/users/525024/screenshots/14013552/media/00656440173bbdc071276d9c3aba8cb9.png?resize=400x0
  return (
    <MainProvider>
      <MainWrapper className="p-4">
        <h1 className="font-libre-baskerville font-bold text-xl underline">
          Aset dan Kategori
        </h1>
        <div className="bg-white mx-auto my-4 w-5/6 h-5/6 rounded-xl p-4">
          <MainHeader />
          <MainBody />
        </div>
      </MainWrapper>
    </MainProvider>
  );
}
