import { axiosInstance } from "./api";
import { apiConstant } from "./apiConstant";

export const getAllUserReviews = async ({
  pageParam = 1,
}: {
  pageParam: number;
}) => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.reviews.getAllUserReviews}`,
      {
        params: {
          page: pageParam,
          limit: 9,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getReviewById = async (reviewId: number) => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.reviews.getReviewById}/${reviewId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const deleteReviewHandler = async (reviewId: any) => {
  try {
    const response = await axiosInstance.delete(
      `${apiConstant.reviews.deleteReviewById}/${reviewId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};
