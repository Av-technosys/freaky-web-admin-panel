import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useGetImageUrl, useUploadImage } from "../services/useUploadImage";
import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateProductType } from "../services/useUpdateOrCreateProductType";
import { Checkbox } from "./ui/checkbox";

const AddProductTypeDialog = ({ open, setOpen }: any) => {
  const [imageUrl, setImageUrl] = useState("");
  const [adminApproval, setAdminApproval] = useState<boolean | null>(false);

  const queryClient = useQueryClient();

  const getImageUrlMutation = useGetImageUrl();
  const uploadImageMutation = useUploadImage();

  const createProductTypeMutation = useCreateProductType();

  const handleImageUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageData = {
      fileName: file.name,
      fileType: file.type,
      path: "productType",
    };

    const uploadRes = await getImageUrlMutation.mutateAsync({
      data: imageData,
    });

    if (uploadRes?.data?.uploadUrl) {
      await uploadImageMutation.mutateAsync({
        url: uploadRes.data.uploadUrl,
        file,
      });
      setImageUrl(uploadRes.data.filePath);
    }
  };

  const saveHandler = (e: any) => {
    e.preventDefault();
    const productTypeDetails = {
      name: e.target.name.value,
      description: e.target.description.value,
      mediaURL: imageUrl,
      altText: "product type image",
      adminApproval: adminApproval,
    };

    createProductTypeMutation.mutate(productTypeDetails, {
      onSuccess: () => {
        setOpen(false);
        setImageUrl("");
        queryClient.invalidateQueries({
          queryKey: ["product_type"],
        });
      },
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product Type</DialogTitle>
          </DialogHeader>

          <DialogDescription>
            <form
              id="add-event-type-form"
              action=""
              className="flex flex-col gap-5 "
              onSubmit={(e) => saveHandler(e)}
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="name-1">Name</Label>
                <Input name="name" className="text-black" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name-1">Image</Label>
                {imageUrl != "" && (
                  <div className="h-32 w-32 rounded-xl overflow-hidden border bg-gray-100">
                    <img
                      src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${imageUrl}`}
                      alt="product Type image"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <Input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="text-black"
                  onChange={(e) => handleImageUpload(e)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>New Product Approval</Label>

                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="yes"
                      checked={adminApproval === true}
                      onCheckedChange={() => setAdminApproval(!adminApproval)}
                    />
                    <Label htmlFor="yes">Yes</Label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name-1">Description</Label>
                <Textarea className="text-black" name="description" />
              </div>
            </form>
          </DialogDescription>

          <DialogFooter className="flex justify-end gap-2 pt-0">
            <Button
              onClick={() => setOpen(false)}
              size="sm"
              variant="outline"
              className="rounded-lg"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              form="add-event-type-form"
              size="sm"
              variant="destructive"
              className="rounded-lg"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProductTypeDialog;
