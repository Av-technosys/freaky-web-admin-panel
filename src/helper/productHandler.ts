import { axiosInstance } from "./api";
import { apiConstant } from "./apiConstant";

export const createProductTypeHandler = async (productTypeDetails: any) => {
  try {
    const response = await axiosInstance.post(
      `${apiConstant.product.createProductType}`,
      productTypeDetails
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getAllProductTypes = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.product.getAllProductTypes}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const updateProductTypeHandler = async ({
  data,
  productTypeId,
}: any) => {
  try {
    const response = await axiosInstance.put(
      `${apiConstant.product.updateProductType}/${productTypeId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const deleteProductTypeHandler = async (productTypeId: any) => {
  try {
    const response = await axiosInstance.delete(
      `${apiConstant.product.deleteProductType}/${productTypeId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};
