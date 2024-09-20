import { useState } from "react";
import { useAssetDetailData } from "../../Providers/AssetDetailProvider";

export const useHeader = () => {
  const {isEditing, setIsEditing} = useAssetDetailData()
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleImageError = () => {
    setImageUrl("/images/no-image.png")
  }

  const handleEditClick = () => {
      setIsEditing(!isEditing);
  }
  return { imageUrl, handleImageError, isEditing, handleEditClick };
};