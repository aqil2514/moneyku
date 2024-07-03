import axios, { isAxiosError } from "axios";
import { endpoint } from "lib/server";
import { getUser } from "utils/account";
import { getFormData } from "utils/general";
import { AssetApiHandler, AssetApiPut, AssetsData } from "~/@types/Assets";
import { BasicHTTPResponse } from "~/@types/General";

const apiHandler: AssetApiHandler = {
  async post(request) {
    const data = await request.formData();
    const formData = getFormData.asset(data);
    const user = await getUser(request);

    if (!formData.assetName.trim()) {
      const result: BasicHTTPResponse<AssetsData> = {
        message: "Nama Aset belum diisi",
        status: "error",
        data: {} as AssetsData,
      };
      return result;
    }
    if (
      formData.assetCategory === "Lainnya" &&
      !formData.newAssetCategory?.trim()
    ) {
      const result: BasicHTTPResponse<AssetsData> = {
        message: "Kategori asset belum ditentukan",
        status: "error",
        data: {} as AssetsData,
      };
      return result;
    }
    if (!formData.assetDescription.trim()) {
      const result: BasicHTTPResponse<AssetsData> = {
        message: "Kategori asset belum ditentukan",
        status: "error",
        data: {} as AssetsData,
      };
      return result;
    }

    try {
      const res = await axios.post<BasicHTTPResponse<AssetsData>>(
        `${endpoint}/assets`,
        {
          formData,
          userId: user.uid,
        }
      );

      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const data: BasicHTTPResponse<AssetsData> = error.response?.data;
        return data;
      }

      const result:BasicHTTPResponse<AssetsData> = {
        message:"Terjadi kesalahan pada server",
        status:"error",
        statusCode: 500,
        data: {} as AssetsData
      } 

      return result;
    }
  },
    async put(request) {
    const data = await request.formData();
    const formData = getFormData.asset(data);
    const { oldAssetName, assetName } = formData;
    const newAssetName = oldAssetName === assetName ? undefined : assetName;
    const user = await getUser(request);

    try {
      const res = await axios.put<BasicHTTPResponse<AssetsData>>(
        `${endpoint}/assets`,
        {
          formData,
          userId: user.uid,
        }
      );

      const data = res.data;

      const response: AssetApiPut = {
        message: data.message,
        data: data.data as AssetsData,
        newName: newAssetName,
        status: "success",
        statusCode: 200,
      };
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        const data: BasicHTTPResponse<AssetsData> = error.response?.data;
        const statusCode = data.statusCode;
        if (statusCode === 409) {
          const message = data.message;
          const response: AssetApiPut = {
            message,
            newName: "",
            status: "error",
            data: {} as AssetsData,
          };
          return response;
        }
      }
      const response: AssetApiPut = {
        message: "Terjadi kesalahan pada server",
        status: "error",
        statusCode: 500,
        data: {} as AssetsData,
        newName: "",
      };

      return response;
    }
  },
  async delete(request) {
    const formData = await request.formData();
    const user = await getUser(request);
    const assetName = String(formData.get("asset-name"));
    const deleteOption = String(formData.get("delete-option"))
      .toLowerCase()
      .replaceAll(" ", "-");

    if (deleteOption.includes("pilih-aset")) {
      const result: BasicHTTPResponse<null> = {
        message: "Anda belum memilih aset tujuan",
        status: "error",
        data: null,
      };

      return result;
    }
    if (!deleteOption || deleteOption === "null"){
      const result: BasicHTTPResponse<null> = {
        message: "Anda belum memilih opsi tujuan",
        status: "error",
        data: null,
      };

      return result;
    }

    const res = await axios.delete<BasicHTTPResponse<null>>(
      `${endpoint}/assets?asset-name=${assetName}&user-id=${user.uid}&delete-option=${deleteOption}`
    );

    const data = res.data;

    return data;
  },
};

export default apiHandler;
