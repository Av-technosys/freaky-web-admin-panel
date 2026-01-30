import axiosInstance from "./api";
import { apiConstant } from "./apiConstant";

export const getAllFeaturedProducts = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.featuredProduct.getAllFeaturedProducts}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const updateProductPriorityHandler = async ({
  currentProduct,
  currentProductPriority,
  nextProductPriority,
  categoryId,
}: any) => {
  try {
    const response = await axiosInstance.put(
      `${apiConstant.featuredProduct.updateFeaturedProduct}/${currentProduct}`,
      {
        currentProductPriority: currentProductPriority,
        nextProductPriority: nextProductPriority,
        categoryId: categoryId,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getVendorServices = async (page: number, page_size: number) => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getAllServices}?page=${page}&page_size=${page_size}`,
    );

    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const createFeaturedProductHandler = async (productData: any) => {
  try {
    const response = await axiosInstance.post(
      `${apiConstant.featuredProduct.createFeaturedProduct}`,
      productData,
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};
