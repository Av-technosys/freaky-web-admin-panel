import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProductTypeHandler,
  deleteProductTypeHandler,
  updateProductTypeHandler,
} from "../helper/productHandler";

export const useCreateProductType = () => {
  return useMutation({
    mutationFn: createProductTypeHandler,
    onSuccess: () => {
      toast.success("Product Type created successfully.");
    },
    onError: () => {
      toast.error("Unable to create product type");
    },
  });
};

export const useUpdateProductType = () => {
  return useMutation({
    mutationFn: updateProductTypeHandler,
    onSuccess: () => {
      toast.success("Product Type updated successfully.");
    },
    onError: () => {
      toast.error("Unable to update product type");
    },
  });
};

export const useDeleteProductType = () => {
  return useMutation({
    mutationFn: deleteProductTypeHandler,
    onSuccess: () => {
      toast.success("Product Type Deleted successfully.");
    },
    onError: () => {
      toast.error("Unable to delete product type");
    },
  });
};
