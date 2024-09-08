import React, { SetStateAction, useState } from "react";
import { AssetsData } from "~/@types/Assets";
import { useAssetContext } from "./AssetsProvider";
import PopupDetail from "./A_PopupDetail";
import PopupEdit from "./A_EditMode";
import PopupDelete from "./A_DeleteMode";
// import PopupDelete from "./PopupDelete";
// import PopupEdit from "./PopupEdit";

interface DetailProps {
  assetName: string;
  setAssetName: React.Dispatch<SetStateAction<string>>;
}

export interface PopupProps {
  data: AssetsData | undefined;
  assetName: string;
  setAssetName: React.Dispatch<SetStateAction<string>>;
  setEditMode: React.Dispatch<SetStateAction<boolean>>;
  setDeleteMode: React.Dispatch<SetStateAction<boolean>>;
}

export default function DetailPopup({ assetName, setAssetName }: DetailProps) {
  const { assetData } = useAssetContext();
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const data = assetData.find((a) => a.name === assetName);
  return (
    <div className="popup">
      <div className="popup-edit">
        {!deleteMode && !editMode && (
          <PopupDetail
            data={data}
            assetName={assetName}
            setAssetName={setAssetName}
            setDeleteMode={setDeleteMode}
            setEditMode={setEditMode}
          />
        )}
        {editMode && <PopupEdit setAssetName={setAssetName} setEditMode={setEditMode} data={data} />}
        {deleteMode && (
          <PopupDelete setAssetName={setAssetName} setDeleteMode={setDeleteMode} data={data} />
        )}
      </div>
    </div>
  );
}
