import axiosInstance from "./api";
import { apiConstant } from "./apiConstant";

export const getAllRequestedVendors = async (
  page: number,
  page_size: number,
  debouncedSearch?: string,
) => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getAllRequestedVendors}?page=${page}&page_size=${page_size}&text=${debouncedSearch}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getAllRejectedVendors = async (
  page: number,
  page_size: number,
  debouncedSearch?: string,
) => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getAllRejectedVendors}?page=${page}&page_size=${page_size}&text=${debouncedSearch}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getAllVendors = async (
  page: number,
  page_size: number,
  debouncedSearch?: string,
) => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getAllVendors}?page=${page}&page_size=${page_size}&text=${debouncedSearch}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getAllUsers = async (
  page: number,
  page_size: number,
  debouncedSearch?: string,
) => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.user.getAllUsers}?page=${page}&page_size=${page_size}&text=${debouncedSearch}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getVendorInfo = async (vendorId: any) => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.vendor.getVendorInfo}/${vendorId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getUserInfo = async (userId: any) => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.user.getUserInfo}/${userId}`,
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
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};
