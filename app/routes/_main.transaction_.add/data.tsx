import { AssetsData } from "~/@types/Assets";
import { ButtonListProps } from "./interface";

export const buttonLists:ButtonListProps[] = [
  {
    color:"primary",
    label:"Pengeluaran",
    type:"Pengeluaran"
  },
  {
    color:"primary",
    label:"Pemasukan",
    type:"Pemasukan"
  },
  {
    color:"primary",
    label:"Transfer",
    type:"Transfer"
  },
]

export const AssetLists = ({ assetData }: { assetData: AssetsData[] }) => {
    return (
      <datalist id="asset-list">
        {assetData.map((d) => (
          <option value={d.name} key={d.name} />
        ))}
      </datalist>
    );
  };
  
  