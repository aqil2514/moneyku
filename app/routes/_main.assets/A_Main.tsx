import React, { useState } from "react";
import Button from "components/Inputs/Button";
import { useAssetContext } from "./AssetsProvider";
import { currencyFormat } from "utils/general";
import PopupAdd from "./A_AddMode";
import DetailPopup from "./A_Detail";

export default function MainPage() {
  const { accountsData } = useAssetContext();
  const [assetName, setAssetName] = useState<string>("");
  const [addMode, setAddMode] = useState<boolean>(false);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLButtonElement;
    const name = target.getAttribute("data-value");
    if (name) {
      setAssetName(name);
    }
  };

  // Referensi UI : https://cdn.dribbble.com/users/525024/screenshots/14013552/media/00656440173bbdc071276d9c3aba8cb9.png?resize=400x0
  return (
    <>
      <div className="main-page">
        <h1 className="font-playfair-bold title-page">Aset</h1>
        <div id="asset-menu" style={{margin:"1rem 0"}}>
          <Button color="success" onClick={() => setAddMode(true) }>
            Tambah Aset
          </Button>
        </div>
        <div id="asset-container">
          {accountsData.map((d) => (
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
