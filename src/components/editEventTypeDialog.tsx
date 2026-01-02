import { useEffect, useState } from "react";
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
import { useUpdateEventType } from "../services/useUpdateOrCreateEventType";
import { useQueryClient } from "@tanstack/react-query";

const EditEventTypeDialog = ({ open, setOpen, eventTypeDetails }: any) => {
  const [details, setDetails] = useState(eventTypeDetails);
  const queryClient = useQueryClient();

  const getImageUrlMutation = useGetImageUrl();
  const uploadImageMutation = useUploadImage();
  const updateEventTypeMutation = useUpdateEventType();

  useEffect(() => {
    if (eventTypeDetails) {
      setDetails(eventTypeDetails);
    }
  }, [eventTypeDetails]);

  const UpdateHandler = (value: any, name: any) => {
    const updated = { ...details };
    if (name == "name") {
      updated.name = value;
      setDetails(updated);
    } else {
      updated.description = value;
      setDetails(updated);
    }
  };

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
      setDetails((prev: any) => ({
        ...prev,
        image: uploadRes.data.filePath,
      }));
    }
  };

  const saveHandler = (eventTypeId: any) => {
    const data = {
      name: details.name,
      description: details.description,
      image: details.image,
    };
    updateEventTypeMutation.mutate(
      { data, eventTypeId },
      {
        onSuccess: () => {
          setOpen(false);
          queryClient.invalidateQueries({
            queryKey: ["event_types"],
          });
        },
      }
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event Type</DialogTitle>
          </DialogHeader>

          <DialogDescription className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name-1">Name</Label>
              <Input
                onChange={(e) => UpdateHandler(e.target.value, "name")}
                name="name"
                value={details?.name}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name-1">Image</Label>
              <div className="h-32 w-32 rounded-xl overflow-hidden border bg-gray-100">
                <img
                  src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${
                    details?.image
                  }`}
                  alt={details?.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <Input
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name-1">Description</Label>
              <Textarea
                onChange={(e) => UpdateHandler(e.target.value, "description")}
                name="description"
                value={details?.description}
              />
            </div>
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
              onClick={() => saveHandler(details.id)}
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

export default EditEventTypeDialog;
