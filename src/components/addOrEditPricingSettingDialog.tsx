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

import { useEffect, useState } from "react";
import {
  useCreatePricingSetting,
  useUpdatePricingSetting,
} from "../services/useGetOrUpdateOrCreateOrDeletePricingSetting";

const AddOrEditPricingSettingDialog = ({
  open,
  setOpen,
  pricingDetails,
}: any) => {
  const queryClient = useQueryClient();
  const [details, setDetails] = useState({
    name: "",
    description: "",
    feePercentage: "",
  });

  useEffect(() => {
    if (pricingDetails != "") {
      setDetails(pricingDetails);
    } else {
      setDetails({ name: "", description: "", feePercentage: "" });
    }
  }, [pricingDetails]);

  const createPricingSettingMutation = useCreatePricingSetting();
  const updatePricingSettingMutation = useUpdatePricingSetting();

  const handleUpdateHandler = (value: any, name: any) => {
    const updated = { ...details };
    if (name == "name") {
      updated.name = value;
      setDetails(updated);
    } else if (name == "feePercentage") {
      updated.feePercentage = value;
      setDetails(updated);
    } else {
      updated.description = value;
      setDetails(updated);
    }
  };

  const saveHandler = (e: any) => {
    e.preventDefault();
    const pricingData = {
      name: details.name,
      description: details.description,
      feePercentage: details.feePercentage,
    };

    if (!pricingDetails) {
      createPricingSettingMutation.mutate(pricingData, {
        onSuccess: () => {
          setOpen(false);
          setDetails({ name: "", description: "", feePercentage: "" });
          queryClient.invalidateQueries({
            queryKey: ["pricing_setting"],
          });
        },
      });
    } else {
      updatePricingSettingMutation.mutate(
        { pricingData, pricingSettingId: pricingDetails.id },
        {
          onSuccess: () => {
            setOpen(false);
            setDetails({ name: "", description: "", feePercentage: "" });
            queryClient.invalidateQueries({
              queryKey: ["pricing_setting"],
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
              {pricingDetails ? "Edit Pricing Setting" : "Add Pricing Setting"}
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
                  placeholder="Enter Pricing Setting Name"
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
                  placeholder="Enter Pricing Description"
                  className="text-black"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="feePercentage">Fee Percentage</Label>
                <Input
                  name="feePercentage"
                  type="number"
                  value={details.feePercentage}
                  onChange={(e) =>
                    handleUpdateHandler(e.target.value, "feePercentage")
                  }
                  placeholder="Enter Fee Percentage"
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
                createPricingSettingMutation.isPending ||
                updatePricingSettingMutation.isPending
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

export default AddOrEditPricingSettingDialog;
