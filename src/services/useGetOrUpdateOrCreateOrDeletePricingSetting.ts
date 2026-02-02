import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createPricingSettingHandler,
  deletePricingSettingHandler,
  getAllPricingSetting,
  updatePricingSettingHandler,
} from "../helper/pricingSetttingHandler";
import { toast } from "sonner";

export const useGetPricingSetting = () => {
  return useQuery({
    queryKey: ["pricing_setting"],
    queryFn: () => getAllPricingSetting(),
  });
};

export const useCreatePricingSetting = () => {
  return useMutation({
    mutationFn: createPricingSettingHandler,
    onSuccess: () => {
      toast.success("Pricing Setting created successfully.");
    },
    onError: () => {
      toast.error("Unable to create pricing setting");
    },
  });
};

export const useUpdatePricingSetting = () => {
  return useMutation({
    mutationFn: updatePricingSettingHandler,
    onSuccess: () => {
      toast.success("Pricing Setting updated successfully.");
    },
    onError: () => {
      toast.error("Unable to update pricing setting");
    },
  });
};

export const useDeletePricingSetting = () => {
  return useMutation({
    mutationFn: deletePricingSettingHandler,
    onSuccess: () => {
      toast.success("Pricing Setting Deleted successfully.");
    },
    onError: () => {
      toast.error("Unable to delete pricing setting");
    },
  });
};
