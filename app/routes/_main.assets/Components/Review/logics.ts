import { useEffect, useState } from "react";
import { FormAccounts } from "~/@types/Assets-Experimental";

export const useDBFE_Review = (setReviewPage:React.Dispatch<React.SetStateAction<boolean>>) => {
    const [formData, setFormData] = useState<FormAccounts | null>(null);
  
    useEffect(() => {
      const jsonFormData = localStorage.getItem("edit-asset");
      if (jsonFormData) {
        try {
          const parsedData = JSON.parse(jsonFormData) as FormAccounts;
          setFormData(parsedData);
        } catch (error) {
          console.error("Error parsing JSON from localStorage:", error);
        }
      }
    }, []);
  
    const backHandler = () => {
      localStorage.removeItem("edit-asset");
  
      setFormData(null)
  
      setReviewPage(false)
    }
  
    return {formData, backHandler}
  }