import { useEffect, useState } from "react";
import { useAssetDetailData } from "../../Providers/AssetDetailProvider";
import { useSearchParams } from "@remix-run/react";

export const useHeader = () => {
  const { isEditing, setIsEditing } = useAssetDetailData();
  const [imageUrl, setImageUrl] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [urlSearchParams, setURLSearchParams] = useSearchParams();

  useEffect(() => {
    const actionParam = urlSearchParams.get("action");

    if (!actionParam || actionParam === "read") {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [setIsEditing, urlSearchParams]);

  const handleImageError = () => {
    setImageUrl("/images/no-image.png");
  };

  const handleEditClick = () => {
    setIsEditing((prevIsEditing) => {
      const newIsEditing = !prevIsEditing;

      setURLSearchParams(
        (prevParams) => {
          const updatedSearchParams = new URLSearchParams(prevParams);

          if (newIsEditing) {
            updatedSearchParams.set("action", "edit");
          } else {
            updatedSearchParams.set("action", "read");
          }

          return updatedSearchParams;
        },
        { replace: true }
      );

      return newIsEditing;
    });
  };

  return { imageUrl, handleImageError, isEditing, handleEditClick };
};
