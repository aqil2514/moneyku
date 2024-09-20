import React, {
  createContext,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AssetDetailContextProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<SetStateAction<boolean>>;
}

const AssetDetailContext = createContext<AssetDetailContextProps>(
  {} as AssetDetailContextProps
);

export default function AssetDetailProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const value: AssetDetailContextProps = {
    isEditing,
    setIsEditing,
  };

  return (
    <AssetDetailContext.Provider value={value}>
      {children}
    </AssetDetailContext.Provider>
  );
}

export function useAssetDetailData() {
  return useContext(AssetDetailContext);
}
