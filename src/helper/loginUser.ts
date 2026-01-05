import { axiosInstance } from "./api";
import { apiConstant } from "./apiConstant";

export const loginUser = async (userData: any) => {
  try {
    const response = await axiosInstance.post(
      apiConstant.authentication.login,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};
