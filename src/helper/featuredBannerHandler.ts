import { axiosInstance } from "./api";
import { apiConstant } from "./apiConstant";

export const getAllFeaturedBanners = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.featuredBanner.getAllFeaturedBanners}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const updateBannerPriorityHandler = async ({
  currentBanner,
  currentBannerPriority,
  nextBannerPriority,
}: any) => {
  try {
    const response = await axiosInstance.put(
      `${apiConstant.featuredBanner.updateFeaturedBanner}/${currentBanner}`,
      {
        currentBannerPriority: currentBannerPriority,
        nextBannerPriority: nextBannerPriority,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};
