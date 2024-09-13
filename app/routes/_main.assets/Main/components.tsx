import { ButtonHeaderProps, SectionState } from "./interface";
import { FaLayerGroup, FaMoneyBill } from "react-icons/fa";
import { useMainAssetData } from "./MainProvider";
import { ScrollArea } from "components/ui/scroll-area";
import { useAssetData } from "../AssetsProvider";
import React, { useEffect, useState } from "react";
import { Accounts, Category } from "~/@types/Assets-Experimental";
import { useSearchParams } from "@remix-run/react";

const buttonLabels: ButtonHeaderProps[] = [
  {
    section: "asset",
    icons: <FaMoneyBill />,
  },
  {
    section: "category",
    icons: <FaLayerGroup />,
  },
];

const AccountIcon: React.FC<{ account: Accounts | Category }> = ({
  account,
}) => {
  const [isImageValid, setIsImageValid] = useState<boolean>(true);

  useEffect(() => {
    if (typeof account.icon === "string") {
      const img = new Image();
      img.src = account.icon;
      img.onload = () => setIsImageValid(true);
      img.onerror = () => setIsImageValid(false);
    }
  }, [account.icon]);

  return (
    <div
      className="py-2 px-4 rounded-sm max-h-16 max-w-16"
      style={{ backgroundColor: account.color || "#000" }}
    >
      {isImageValid && account.icon ? (
        <img
          src={
            typeof account.icon === "string"
              ? account.icon
              : account.icon.toString()
          }
          alt={account.name}
          className="h-8 w-8"
          onError={() => setIsImageValid(false)}
        />
      ) : (
        <p className="uppercase font-ubuntu font-bold text-white">
          {account.name?.charAt(0) ?? "N/A"}
        </p>
      )}
    </div>
  );
};


export const MainBody = () => {
  const { section, setSection } = useMainAssetData();
  const [searchParams] = useSearchParams(); // Mengambil query parameter
  
  useEffect(() => {
    const sectionParam = searchParams.get("section") as SectionState; // Ambil nilai dari query parameter "section"
    if (sectionParam) {
      setSection(sectionParam); // Setel section berdasarkan query params
    } else {
      setSection("asset"); // Setel default section jika tidak ada query param "section"
    }
  }, [searchParams, setSection]);

  return (
    <ScrollArea className="h-3/4 w-full p-2">
      {section === "asset" && <MainBody_Asset />}
      {section === "category" && <MainBody_Category />}
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
          className="border-slate-300 border-2 rounded duration-200 hover:border-sky-600 hover:bg-slate-200 p-2 flex"
        >
          <div className="flex gap-2 items-center">
            <AccountIcon account={account} />
            <p className="font-poppins font-semibold">{account.name}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

const MainBody_Category = () => {
  const { categoriesData } = useAssetData();
  return (
    <div className="grid grid-cols-2 gap-4">
      {categoriesData.map((category) => (
        <button
          key={category.category_id}
          data-account-id={category.category_id}
          className="border-slate-300 border-2 rounded duration-200 hover:border-sky-600 hover:bg-slate-200 p-2 flex"
        >
          <div className="flex gap-2 items-center">
            <AccountIcon account={category} />
            <p className="font-poppins font-semibold">{category.name}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export const MainHeader = () => {
  const { section, setSection } = useMainAssetData();
  const sectionMapped: Record<SectionState, string> = {
    asset: "Asset",
    category: "Kategori Aset",
  };
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="border-blue-700 border-b-8 border-double py-2 grid grid-cols-[30%_auto]">
      <div className="flex justify-center">
        {buttonLabels.map((value, i) => {
          const isActive = value.section === section;
          const label = sectionMapped[value.section as SectionState];
          
          return (
            <button
              className={`w-full duration-200 border-2 py-2 font-bold font-playfair-display rounded-sm flex gap-2 justify-center items-center ${
                isActive
                  ? "border-sky-500 text-sky-600 bg-slate-200 cursor-default"
                  : "hover:border-sky-600 hover:text-sky-600 hover:bg-slate-200 cursor-pointer"
              }`}
              key={i}
              onClick={() => {
                setSection(value.section);
                setSearchParams({ section: value.section }, {replace: true});
              }}
            >
              {value.icons}
              {label}
            </button>
          );
        })}
      </div>

      <div className="mx-auto font-playfair-display text-xl font-bold text-right w-full">
        <h2>{sectionMapped[section]} Saya</h2>
      </div>
    </div>
  );
};
