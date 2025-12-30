import { axiosInstance } from "./api";
import { apiConstant } from "./apiConstant";

export const getAllVendors = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getAllVendors}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const vendorPermissionHandler = async ({ vendorId, status }: any) => {
  try {
    const response = await axiosInstance.put(
      `${apiConstant.vendor.updateVendorStatus}/${vendorId}`,
      {
        status: status,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};
