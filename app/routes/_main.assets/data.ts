import { FormAddState } from "~/@types/Assets"

export const assetCategoryData:string[] = [
    "Tunai",
    "Bank",
    "Tabungan",
    "Asuransi", 
    "Investasi",
    "E-Wallet",
]

// Lanjutin nanti ajah refactoring ini
export const formAddPage:FormAddState[] =[
    {
        element: "input",
        type: "text",
        forId:"asset-name",
        placeHolder:"Masukkan nama aset",
    }
]