import React, { useEffect, useState } from "react";
import { TransactionType } from "./route";

export default function DeletePopup({
  header,
  setDeletePopup,
}: {
  header: string;
  setDeletePopup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [globalData, setGlobalData] = useState<TransactionType>();
  //   TODO : Seleksi kumpulan data jadi data yang dipilih
  //   const [selectedData, setSelectedData] = useState<TransactionBodyType>();
  const getData = async (header: string) => {
    const endpoint = "http://localhost:3000";
    try {
      const res = await fetch(`${endpoint}/transaction/detail/${header}`);
      const data = await res.json();
      setGlobalData(data.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!globalData) {
      getData(header);
    }
  }, [header, globalData]);
  return (
    <div className="popup">
      <div className="popup-delete">
        <div className="popup-delete-header">
          <h3>Data yang akan dihapus</h3>
        </div>
        <div className="popup-delete-body">
          {globalData ? <>{globalData.header}</> : <p>Loading</p>}
        </div>
        <div className="popup-delete-footer">
          <button
            className="button-close"
            onClick={() => setDeletePopup(false)}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
