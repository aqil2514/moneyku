/* Form */

import Button from "components/Inputs/Button";
import { Input } from "components/ui/input";
import { useAddModeData } from "./Providers/AddMode";
import { rupiahConvert } from "utils/client/general";
import { assetCategoryData } from "./data";

export const AssetNameInput = () => {
  return (
    <div>
      <label htmlFor="asset-name">Nama Aset</label>
      <div className="flex w-full items-center space-x-2">
        <Input type="email" id="asset-name" placeholder="Masukkan nama aset" />
        <Button color="primary" className="text-xs">
          Cek
        </Button>
      </div>
    </div>
  );
};

export const AssetNominalInputs = () => {
  const { assetNominal, fetcher, setAssetNominal } = useAddModeData();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return rupiahConvert(e, setAssetNominal);
  };
  const isSubmitting = fetcher.state === "submitting";

  return (
    <div className="form-input-basic">
      <label htmlFor="asset-nominal" className="font-ubuntu-reguler">
        Total Nominal Aset :{" "}
      </label>
      <Input
        type="text"
        name="asset-nominal"
        placeholder="Masukkan nominal awal aset"
        id="asset-nominal"
        required
        onChange={handleChange}
        value={assetNominal}
        className="font-poppins-reguler"
        disabled={isSubmitting}
      />
    </div>
  );
};

export const AssetSelectCategory = () => {
  const { selectValue, setSelectValue, fetcher } = useAddModeData();
  const isSubmitting = fetcher.state === "submitting";

  return (
    <div className="form-input-basic">
      <label htmlFor="asset-category" className="font-ubuntu-reguler">
        Kategori Aset
      </label>
      <select
        name="asset-category"
        id="asset-category"
        value={selectValue}
        required
        className="font-poppins-reguler"
        onChange={(e) => setSelectValue(e.target.value)}
        disabled={isSubmitting}
      >
        {assetCategoryData.sort().map((d) => (
          <option value={d} key={d} className="font-poppins-reguler">
            {d}
          </option>
        ))}
        <option value={undefined} disabled>
          ──────────
        </option>
        <option value="Lainnya" className="font-poppins-reguler">
          Lainnya
        </option>
      </select>
      {selectValue === "Lainnya" && (
        <>
          <label htmlFor="new-asset-category">Kategori Aset Baru</label>
          <input
            type="text"
            name="new-asset-category"
            id="new-asset-category"
            placeholder="Nama kategori aset baru"
            required
            disabled={isSubmitting}
          />
        </>
      )}
    </div>
  );
};

export const AssetDescription = () => {
  const { fetcher } = useAddModeData();
  const isSubmitting = fetcher.state === "submitting";
  
  return (
    <div className="form-input-basic">
      <label htmlFor="asset-description" className="font-ubuntu-reguler">
        Deskripsi Aset :{" "}
      </label>
      <textarea
        name="asset-description"
        id="asset-description"
        className="font-poppins-reguler"
        placeholder="Contoh: Aset khusus untuk transportasi"
        required
        disabled={isSubmitting}
      />
    </div>
  );
};
