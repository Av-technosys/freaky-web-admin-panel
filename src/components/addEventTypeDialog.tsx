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
import { useCreateEventType } from "../services/useUpdateOrCreateEventType";

const AddEventTypeDialog = ({ open, setOpen }: any) => {
  const [imageUrl, setImageUrl] = useState("");

  const queryClient = useQueryClient();

  const getImageUrlMutation = useGetImageUrl();
  const uploadImageMutation = useUploadImage();

  const createEventTypeMutation = useCreateEventType();

  const handleImageUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageData = {
      fileName: file.name,
      fileType: file.type,
      path: "eventType",
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
    const eventTypeDetails = {
      name: e.target.name.value,
      description: e.target.description.value,
      image: imageUrl,
    };

    createEventTypeMutation.mutate(eventTypeDetails, {
      onSuccess: () => {
        setOpen(false);
        setImageUrl("");
        queryClient.invalidateQueries({
          queryKey: ["event_types"],
        });
      },
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Event Type</DialogTitle>
          </DialogHeader>

          <DialogDescription>
            <form
              id="add-event-type-form"
              action=""
              className="flex flex-col gap-5"
              onSubmit={(e) => saveHandler(e)}
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="name-1">Name</Label>
                <Input className="text-black" name="name" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name-1">Image</Label>
                {imageUrl != "" && (
                  <div className="h-32 w-32 rounded-xl overflow-hidden border bg-gray-100">
                    <img
                      src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${imageUrl}`}
                      alt="event Type image"
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

export default AddEventTypeDialog;
