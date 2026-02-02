import axiosInstance from "./api";
import { apiConstant } from "./apiConstant";

export const getAllPricingSetting = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.pricingSetting.getPricingSetting}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const createPricingSettingHandler = async (pricingData: any) => {
  try {
    const response = await axiosInstance.post(
      `${apiConstant.pricingSetting.createPricingSetting}`,
      pricingData,
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const updatePricingSettingHandler = async ({
  pricingData,
  pricingSettingId,
}: any) => {
  try {
    const response = await axiosInstance.put(
      `${apiConstant.pricingSetting.updatePricingSetting}/${pricingSettingId}`,
      pricingData,
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const deletePricingSettingHandler = async (pricingSettingId: any) => {
  try {
    const response = await axiosInstance.delete(
      `${apiConstant.pricingSetting.deletePricingSetting}/${pricingSettingId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};
