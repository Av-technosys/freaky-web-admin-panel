import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { vendorPermissionHandler } from "../helper/vendorHandler";

export const useUpdateVendorPermission = () => {
  return useMutation({
    mutationFn: vendorPermissionHandler,
    onSuccess: () => {
      toast.success("Permission updated successfully.");
    },
    onError: () => {
      toast.error("Unable to update permission");
    },
  });
};
