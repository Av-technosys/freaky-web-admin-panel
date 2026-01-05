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

export const useGetVendors = () => {
  return useQuery({
    queryKey: ["vendors"],
    queryFn: () => getAllVendors(),
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
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
