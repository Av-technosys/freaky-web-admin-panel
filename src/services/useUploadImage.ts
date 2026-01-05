import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getImageUrlHandler,
  UploadImageHandler,
} from "../helper/uploadImageHandler";

export const useGetImageUrl = () => {
  return useMutation({
    mutationFn: ({ data }: any) => getImageUrlHandler(data),
    onSuccess: () => {},
    onError: () => {},
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: ({ url, file }: any) => UploadImageHandler(url, file),
    onSuccess: () => {
      toast.success("Image Upload Successfully.");
    },
    onError: () => {
      toast.error("Unable to upload image.");
    },
  });
};
