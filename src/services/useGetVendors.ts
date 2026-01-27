import { useQuery } from "@tanstack/react-query";
import {
  getAllRejectedVendors,
  getAllRequestedVendors,
  getAllUsers,
  getAllVendors,
  getUserInfo,
  getVendorInfo,
} from "../helper/vendorHandler";

export const useGetRequestedVendors = (
  page: number,
  page_size: number,
  debouncedSearch?: string,
) => {
  return useQuery({
    queryKey: ["requested_vendors", page, debouncedSearch],
    queryFn: () => getAllRequestedVendors(page, page_size, debouncedSearch),
  });
};

export const useGetRejectedVendors = (
  page: number,
  page_size: number,
  debouncedSearch?: string,
) => {
  return useQuery({
    queryKey: ["rejected_vendors", page, debouncedSearch],
    queryFn: () => getAllRejectedVendors(page, page_size, debouncedSearch),
  });
};

export const useGetVendors = (
  page: number,
  page_size: number,
  debouncedSearch?: string,
) => {
  return useQuery({
    queryKey: ["vendors", page, debouncedSearch],
    queryFn: () => getAllVendors(page, page_size, debouncedSearch),
  });
};

export const useGetUsers = (
  page: number,
  page_size: number,
  debouncedSearch?: string,
) => {
  return useQuery({
    queryKey: ["users", page, debouncedSearch],
    queryFn: () => getAllUsers(page, page_size, debouncedSearch),
  });
};

export const useGetVendorDetails = (vendorId: any) => {
  return useQuery({
    queryKey: ["vendor_details", vendorId],
    queryFn: () => getVendorInfo(vendorId),
    enabled: !!vendorId,
  });
};

export const useGetUserDetails = (userId: any) => {
  return useQuery({
    queryKey: ["user_details", userId],
    queryFn: () => getUserInfo(userId),
    enabled: !!userId,
  });
};
