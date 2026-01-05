import { useQuery } from "@tanstack/react-query";
import {
  getAllRequestedVendors,
  getAllUsers,
  getAllVendors,
  getUserInfo,
  getVendorInfo,
} from "../helper/vendorHandler";

export const useGetRequestedVendors = () => {
  return useQuery({
    queryKey: ["requested_vendors"],
    queryFn: () => getAllRequestedVendors(),
  });
};

export const useGetVendors = (page: number, page_size: number) => {
  return useQuery({
    queryKey: ["vendors", page],
    queryFn: () => getAllVendors(page, page_size),
  });
};

export const useGetUsers = (page: number, page_size: number) => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getAllUsers(page, page_size),
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
