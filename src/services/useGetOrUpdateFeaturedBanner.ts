import { useMutation, useQuery } from "@tanstack/react-query";
import {
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
