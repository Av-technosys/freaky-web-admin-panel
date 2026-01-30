import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createFeaturedCategoryHandler,
  deleteFeaturedCategoryHandler,
  getAllFeaturedCategories,
  updateFeaturedCategoryHandler,
} from "../helper/featuredCategoryHandler";
import { toast } from "sonner";

export const useGetFeaturedCategories = () => {
  return useQuery({
    queryKey: ["featured_category"],
    queryFn: () => getAllFeaturedCategories(),
  });
};

export const useCreateFeaturedCategory = () => {
  return useMutation({
    mutationFn: createFeaturedCategoryHandler,
    onSuccess: () => {
      toast.success("Featured Category created successfully.");
    },
    onError: () => {
      toast.error("Unable to create featured category");
    },
  });
};

export const useUpdateFeaturedCategory = () => {
  return useMutation({
    mutationFn: updateFeaturedCategoryHandler,
    onSuccess: () => {
      toast.success("Featured Category updated successfully.");
    },
    onError: () => {
      toast.error("Unable to update featured category");
    },
  });
};

export const useDeleteFeaturedCategory = () => {
  return useMutation({
    mutationFn: deleteFeaturedCategoryHandler,
    onSuccess: () => {
      toast.success("Featured Category Deleted successfully.");
    },
    onError: () => {
      toast.error("Unable to delete featured category");
    },
  });
};
