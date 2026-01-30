import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
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
import {
  useCreateFeaturedCategory,
  useUpdateFeaturedCategory,
} from "../services/useGetAndCreateAndUpdateFeaturedCategory";
import { useEffect, useState } from "react";

const AddOrEditFeaturedCategoryDialog = ({
  open,
  setOpen,
  categoryDetails,
}: any) => {
  const queryClient = useQueryClient();
  const [details, setDetails] = useState({ name: "", description: "" });

  useEffect(() => {
    if (categoryDetails != "") {
      setDetails(categoryDetails);
    } else {
      setDetails({ name: "", description: "" });
    }
  }, [categoryDetails]);

  const createCategoryMutation = useCreateFeaturedCategory();
  const updateCategoryMutation = useUpdateFeaturedCategory();

  const handleUpdateHandler = (value: any, name: any) => {
    const updated = { ...details };
    if (name == "name") {
      updated.name = value;
      setDetails(updated);
    } else {
      updated.description = value;
      setDetails(updated);
    }
  };

  const saveHandler = (e: any) => {
    e.preventDefault();
    const categoryData = {
      name: details.name,
      description: details.description,
    };

    if (!categoryDetails) {
      createCategoryMutation.mutate(categoryData, {
        onSuccess: () => {
          setOpen(false);
          setDetails({ name: "", description: "" });
          queryClient.invalidateQueries({
            queryKey: ["featured_category"],
          });
        },
      });
    } else {
      updateCategoryMutation.mutate(
        { categoryData, categoryId: categoryDetails.id },
        {
          onSuccess: () => {
            setOpen(false);
            setDetails({ name: "", description: "" });
            queryClient.invalidateQueries({
              queryKey: ["featured_category"],
            });
          },
        },
      );
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {categoryDetails
                ? "Edit Featured Category"
                : "Add Featured Category"}
            </DialogTitle>
          </DialogHeader>

          <DialogDescription>
            <form
              id="add-category-form"
              action=""
              className="flex flex-col gap-5 "
              onSubmit={(e) => saveHandler(e)}
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="name-1">Name</Label>
                <Input
                  name="name"
                  value={details.name}
                  onChange={(e) => handleUpdateHandler(e.target.value, "name")}
                  placeholder="Enter Category Name"
                  className="text-black"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  name="description"
                  onChange={(e) =>
                    handleUpdateHandler(e.target.value, "description")
                  }
                  value={details.description}
                  placeholder="Enter Category Description"
                  className="text-black"
                />
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
              disabled={
                createCategoryMutation.isPending ||
                updateCategoryMutation.isPending
              }
              type="submit"
              form="add-category-form"
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

export default AddOrEditFeaturedCategoryDialog;
