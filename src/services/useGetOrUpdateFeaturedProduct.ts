import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createFeaturedProductHandler,
  deleteFeaturedProductHandler,
  getAllFeaturedProducts,
  getVendorServices,
  updateProductPriorityHandler,
} from "../helper/featuredProductHandler";
import { toast } from "sonner";

export const useGetFeaturedProducts = () => {
  return useQuery({
    queryKey: ["featured_products"],
    queryFn: () => getAllFeaturedProducts(),
  });
};

export const useUpdateFeaturedProduct = () => {
  return useMutation({
    mutationFn: updateProductPriorityHandler,
    onSuccess: () => {
      toast.success("Product Priority Updated Successfully.");
    },
    onError: () => {
      toast.error("Unable to update product priority");
    },
  });
};

export const useGetVendorServices = (
  page: number = 1,
  page_size: number = 10,
) => {
  return useQuery({
    queryKey: ["vendor-services", page],
    queryFn: () => getVendorServices(page, page_size),
  });
};

export const useCreateFeaturedProduct = () => {
  return useMutation({
    mutationFn: createFeaturedProductHandler,
    onSuccess: () => {
      toast.success("Featured Product created successfully.");
    },
    onError: () => {
      toast.error("Unable to create featured product");
    },
  });
};

export const useDeleteFeaturedProduct = () => {
  return useMutation({
    mutationFn: deleteFeaturedProductHandler,
    onSuccess: () => {
      toast.success("Featured Product Deleted Successfully.");
    },
    onError: () => {
      toast.error("Unable to delete product ");
    },
  });
};
