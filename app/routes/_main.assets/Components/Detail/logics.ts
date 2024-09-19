import { useState } from "react";

export const Logic_HeaderAssetDetail = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

  return { imageUrl, setImageUrl };
};
