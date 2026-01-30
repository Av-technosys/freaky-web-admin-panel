import axiosInstance from "./api";
import { apiConstant } from "./apiConstant";

export const getAllFeaturedCategories = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.featuredCategory.getAllFeaturedCategory}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const createFeaturedCategoryHandler = async (categoryData: any) => {
  try {
    const response = await axiosInstance.post(
      `${apiConstant.featuredCategory.createFeaturedCategory}`,
      categoryData,
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const updateFeaturedCategoryHandler = async ({
  categoryData,
  categoryId,
}: any) => {
  try {
    const response = await axiosInstance.put(
      `${apiConstant.featuredCategory.updateFeaturedCategory}/${categoryId}`,
      categoryData,
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const deleteFeaturedCategoryHandler = async (categoryId: any) => {
  try {
    const response = await axiosInstance.delete(
      `${apiConstant.featuredCategory.deleteFeaturedCategory}/${categoryId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};
