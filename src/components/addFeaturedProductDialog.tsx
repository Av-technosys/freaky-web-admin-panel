import { useState } from "react";
import {
  useCreateFeaturedProduct,
  useGetVendorServices,
} from "../services/useGetOrUpdateFeaturedProduct";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useQueryClient } from "@tanstack/react-query";
import { useGetFeaturedCategories } from "../services/useGetAndCreateAndUpdateFeaturedCategory";

const AddFeaturedProductDialog = ({ open, setOpen }: any) => {
  const queryClient = useQueryClient();
  const { data } = useGetVendorServices(1, 100);

  const { data: featuredCategories, isPending } = useGetFeaturedCategories();

  const [serviceId, setServiceId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const createFeaturedProductMutation = useCreateFeaturedProduct();

  const saveHandler = (e: any) => {
    e.preventDefault();
    const productData = {
      serviceId: serviceId,
      categoryId: categoryId,
    };
    createFeaturedProductMutation.mutate(productData, {
      onSuccess: () => {
        setOpen(false);
        queryClient.invalidateQueries({
          queryKey: ["featured_products"],
        });
      },
    });
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Featured Product</DialogTitle>
          </DialogHeader>

          <DialogDescription>
            <form
              id="add-product-form"
              action=""
              className="flex flex-col gap-5 "
              onSubmit={(e) => saveHandler(e)}
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="name-1">Service</Label>
                <Select value={serviceId} onValueChange={setServiceId}>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Service</SelectLabel>
                      {isPending && "Loading..."}
                      {!isPending && data?.data?.length === 0 && (
                        <div>
                          <div className="text-[#89868D] ">
                            No service found..
                          </div>
                        </div>
                      )}
                      {data?.data?.map((service: any) => {
                        return (
                          <SelectItem
                            key={service.productId}
                            value={service.productId.toString()}
                          >
                            {service.title}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name-1">Category</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Category</SelectLabel>
                      {isPending && "Loading..."}
                      {!isPending && featuredCategories?.data?.length === 0 && (
                        <div>
                          <div className="text-[#89868D] ">
                            No category found..
                          </div>
                        </div>
                      )}
                      {featuredCategories?.data?.map((category: any) => {
                        return (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
              disabled={createFeaturedProductMutation.isPending}
              form="add-product-form"
              size="sm"
              variant="destructive"
              className="rounded-lg"
            >
              {createFeaturedProductMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddFeaturedProductDialog;
