import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserDetails, updateUserDetails } from "../helper/userProfileHelper";
import { toast } from "sonner";

export const useGetUserInfoDetails = () => {
  return useQuery({
    queryKey: ["user-details"],
    queryFn: () => getUserDetails(),
  });
};

export const useUpdateUserDetails = () => {
  return useMutation({
    mutationFn: updateUserDetails,
    onSuccess: () => {
      toast.success("User details updated successfully.");
    },
    onError: () => {
      toast.error("Unable to updated user details.");
    },
  });
};
