import { getRandomHexColor, rupiahConvert } from "utils/client/general";
import { useEditData } from "../Providers/EditModeProvider";
import { assetCategoryData } from "../data";
import Typography from "components/General/Typography";
import { Input } from "components/ui/input";
import { Badge } from "components/ui/badge";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";

export const AssetCategory = () => {
  const { selectValue, setSelectValue, fetcher } = useEditData();

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
            disabled={isSubmitting}
          />
        </>
      )}
    </div>
  );
};

export const AssetColor = () => {
    const {data} = useEditData();
    const [color, setColor] = useState<string>(data? data.color: "#fff");
  
    const randomHex = () => setColor(getRandomHexColor());
    return (
      <div>
        <Typography variant="p" family="poppins-medium-italic">
          Pilih warna tema
        </Typography>
  
        <div className="flex flex-col gap-2 items-center">
          <HexColorPicker color={color} onChange={setColor} />
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <Badge role="button" onClick={randomHex}>
                Random
              </Badge>
              <Input
                type="text"
                name="asset-color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div
                style={{ backgroundColor: color }}
                className="w-6 rounded-md"
              />
              <Typography variant="p" family="poppins-medium">
                Warna yang dipilh {color}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  };

export const AssetDescription = () => {
    const {fetcher, data} = useEditData();
    const isSubmitting = fetcher.state === "submitting"
    return(
        <div className="form-input-basic">
            <label htmlFor="asset-description" className="font-ubuntu-reguler">
              Deskripsi Aset :{" "}
            </label>
            <textarea
              name="asset-description"
              id="asset-description"
              defaultValue={data?.description}
              className="font-poppins-reguler"
              disabled={isSubmitting}
            />
          </div>
    )
}

export const AssetName = () => {
  const { data, fetcher } = useEditData();
  const isSubmitting = fetcher.state === "submitting";

  return (
    <div className="form-input-basic">
      <label htmlFor="asset-name" className="font-ubuntu-reguler">
        Nama Aset :{" "}
      </label>
      <input
        type="text"
        name="asset-name"
        id="asset-name"
        defaultValue={data?.name}
        className="font-poppins-reguler"
        disabled={isSubmitting}
      />
    </div>
  );
};

export const AssetNominal = () => {
  const { data, fetcher, assetNominal, setAssetNominal } = useEditData();
  const isSubmitting = fetcher.state === "submitting";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return rupiahConvert(e, setAssetNominal);
  };

  return (
    <div className="form-input-basic">
      <label htmlFor="asset-nominal" className="font-ubuntu-reguler">
        Total Nominal Aset :{" "}
      </label>
      <input
        type="text"
        name="asset-nominal"
        placeholder="Masukkan nominal awal aset"
        id="asset-nominal"
        required
        defaultValue={data?.amount}
        onChange={handleChange}
        value={assetNominal}
        className="font-poppins-reguler"
        disabled={isSubmitting}
      />
    </div>
  );
};

export const OldAssetName = () => {
  const { data, fetcher } = useEditData();
  const isSubmitting = fetcher.state === "submitting";
  return (
    <input
      type="hidden"
      name="old-asset-name"
      id="old-asset-name"
      readOnly
      value={data?.name}
      disabled={isSubmitting}
    />
  );
};
