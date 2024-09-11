import { ButtonHeaderProps, SectionState } from "./interface";
import { FaLayerGroup, FaMoneyBill } from "react-icons/fa";
import { useMainAssetData } from "./MainProvider";
import { ScrollArea } from "components/ui/scroll-area";
import { useAssetData } from "../AssetsProvider";

const buttonLabels: ButtonHeaderProps[] = [
  {
    section: "Aset",
    icons: <FaMoneyBill />,
  },
  {
    section: "Category",
    icons: <FaLayerGroup />,
  },
];

export const MainHeader = () => {
  const { section, setSection } = useMainAssetData();
  const sectionMapped: Record<SectionState, string> = {
    Aset: "Aset",
    Category: "Kategori Aset",
  };

  return (
    <div className="border-blue-700 border-b-8 border-double py-2 grid grid-cols-[20%_auto]">
      <div className="flex justify-center">
        {buttonLabels.map((value, i) => {
          const isActive = value.section === section;

          return (
            <button
              className={`w-full duration-200 border-2 py-2 font-bold font-playfair-display rounded-sm flex gap-2 justify-center items-center ${
                isActive
                  ? "border-sky-500 text-sky-600 bg-slate-200 cursor-default"
                  : "hover:border-sky-600 hover:text-sky-600 hover:bg-slate-200 cursor-pointer"
              }`}
              key={i++}
              onClick={() => setSection(value.section)}
            >
              {value.icons}
              {value.section}
            </button>
          );
        })}
      </div>

      <div className="mx-auto font-playfair-display text-xl font-bold">
        <h2>{sectionMapped[section]} Saya</h2>
      </div>
    </div>
  );
};

export const MainBody = () => {
  const { section } = useMainAssetData();
  return (
    <ScrollArea className="h-3/4 w-full p-2">
      {section === "Aset" && <MainBody_Asset />}
      {section === "Category" && <MainBody_Category />}
    </ScrollArea>
  );
};

const MainBody_Asset = () => {
  const { accountsData } = useAssetData();
  return (
    <div className="grid grid-cols-2 gap-4">
      {accountsData.map((account) => (
        <button
          key={account.account_id}
          data-account-id={account.account_id}
          className="border-slate-600 border-2 rounded duration-200 hover:border-sky-600 hover:bg-slate-200 p-2 flex"
        >
            {/* Jika ada data Iconnya, gunakan data tersebut. Jika tidak ada, buat Icon berupa huruf pertama dari nama aset */}
            <div></div>
          {account.name}
        </button>
      ))}
    </div>
  );
};

const MainBody_Category = () => {
  return <div>Komponen Kategori di sini</div>;
};
