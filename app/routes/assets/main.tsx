import React, { useState } from "react";
import { currencyFormat } from "../transaction/route";
import DetailPopup from "./DetailPopup";
import { useAssetContext } from "./route";
import PopupAdd from "./PopupAdd";

export default function MainPage() {
  const { assetData } = useAssetContext();
  const [assetName, setAssetName] = useState<string>("");
  const [addMode, setAddMode] = useState<boolean>(false);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLButtonElement;
    const name = target.getAttribute("data-value");
    if (name) {
      setAssetName(name);
    }
  };
  return (
    <>
      <div className="main-page">
        <h1 className="font-playfair-bold title-page">Aset</h1>
        <div id="asset-menu">
          <button className="button-success" onClick={() => setAddMode(true) }>
            Tambah Aset
          </button>
        </div>
        <div id="asset-container">
          {assetData.map((d) => (
            <button
              key={d.name}
              data-value={d.name}
              className="item-container"
              onClick={clickHandler}
            >
              <p className="font-poppins-semibold">{d.name}</p>
              <hr />
              <p className="font-poppins-medium">
                {currencyFormat.format(d.amount)}
              </p>
            </button>
          ))}
        </div>
      </div>
      {assetName && <DetailPopup assetName={assetName} setAssetName={setAssetName} />}
      {addMode && <PopupAdd setAddMode={setAddMode} /> }
    </>
  );
}
