import { AssetsData } from "~/@types/assets"

export const AssetLists = ({ assetData }: { assetData: AssetsData[] }) => {
    return (
      <datalist id="asset-list">
        {assetData.map((d) => (
          <option value={d.name} key={d.name} />
        ))}
      </datalist>
    );
  };
  
  