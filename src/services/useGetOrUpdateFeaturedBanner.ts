import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createFeaturedBannerHandler,
  getAllFeaturedBanners,
  updateBannerPriorityHandler,
} from "../helper/featuredBannerHandler";
import { toast } from "sonner";

export const useGetFeaturedBanner = () => {
  return useQuery({
    queryKey: ["featured_banner"],
    queryFn: () => getAllFeaturedBanners(),
  });
};

export const useCreateFeaturedBanner = () => {
  return useMutation({
    mutationFn: createFeaturedBannerHandler,
    onSuccess: () => {
      toast.success("Featured Banner created successfully.");
    },
    onError: () => {
      toast.error("Unable to create featured ");
    },
  });
};

export const useUpdateFeaturedBanner = () => {
  return useMutation({
    mutationFn: updateBannerPriorityHandler,
    onSuccess: () => {
      toast.success("Banner Priority Updated Successfully.");
    },
    onError: () => {
      toast.error("Unable to update banner priority");
    },
  });
};
