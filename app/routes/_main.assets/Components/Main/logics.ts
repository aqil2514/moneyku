import { useSearchParams } from "@remix-run/react";
import { useCallback, useEffect, useState } from "react";
import { useAssetData } from "../../Core/MainProvider";
import { SectionState } from "../../Core/interface";
import { Accounts } from "~/@types/Assets-Experimental";

export const useAccountIcon = (imageUrl: string | undefined) => {
  const [isImageValid, setIsImageValid] = useState<boolean>(true);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => setIsImageValid(true);
      img.onerror = () => setIsImageValid(false);
    }
  }, [imageUrl]);

  return { isImageValid, setIsImageValid };
};

export const useMainBody = () => {
  const { section, setSection, isHiding, setIsHiding } = useAssetData();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sectionParam = searchParams.get("section") as SectionState;
    const hideAmountParam = searchParams.get("hideAmount");

    // Membuat instans baru dari URLSearchParams
    const newSearchParam = new URLSearchParams(searchParams);

    // Logika default search param section
    if (
      sectionParam &&
      (sectionParam === "asset" || sectionParam === "category")
    ) {
      setSection(sectionParam);
    } else {
      newSearchParam.set("section", "asset");
      setSection("asset");
    }

    // Logika default search param hideAmount
    if (hideAmountParam === "true") {
      setIsHiding(true);
    } else {
      newSearchParam.set("hideAmount", "false");
      setIsHiding(false);
    }

    // Mengupdate URL hanya sekali setelah kedua parameter sudah di-set
    setSearchParams(newSearchParam, { replace: true });
  }, [searchParams, setSection, setSearchParams, setIsHiding]);

  return {
    section,
    setSection,
    isHiding,
    setIsHiding,
    searchParams,
    setSearchParams,
  };
};

export const useMainBody_Asset = () => {
  const { accountsData } = useAssetData();
  const [openAccountId, setOpenAccountId] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const isValidAccountId = useCallback(
    (account_id: string) => {
      return accountsData.some((account) => account_id === account.account_id);
    },
    [accountsData]
  );

  useEffect(() => {
    const accountIdParam = searchParams.get("account-id");
    if (accountIdParam && isValidAccountId(accountIdParam)) {
      setOpenAccountId(accountIdParam);
    } else {
      setOpenAccountId(null);
    }
  }, [searchParams, isValidAccountId]);

  // Handler untuk menangani pembukaan dialog dan mengatur account-id di URL
  const openHandler = (account_id: Accounts["account_id"]) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("account-id", account_id);
    setSearchParams(newSearchParams, { replace: true });
    setOpenAccountId(account_id);
  };

  // Handler untuk menutup dialog dan menghapus account-id dari URL
  const closeHandler = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("account-id");
    setSearchParams(newSearchParams, { replace: true });
    setOpenAccountId(null);
  };

  return {
    accountsData,
    openAccountId,
    setOpenAccountId,
    searchParams,
    setSearchParams,
    isValidAccountId,
    openHandler,
    closeHandler,
  };
};

export const useMainHeader = () => {
  const { section, setSection } = useAssetData();
  const sectionMapped: Record<SectionState, string> = {
    asset: "Asset",
    category: "Kategori Aset",
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  return { section, setSection, sectionMapped, searchParams, setSearchParams };
};
