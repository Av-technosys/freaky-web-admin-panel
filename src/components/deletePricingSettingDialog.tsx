import { useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

import { useDeletePricingSetting } from "../services/useGetOrUpdateOrCreateOrDeletePricingSetting";

const DeletePricingSettingDialog = ({
  open,
  setOpen,
  pricingSettingId,
}: any) => {
  const deletePricingSettingMutation = useDeletePricingSetting();
  const queryClient = useQueryClient();
  const deleteHandler = () => {
    deletePricingSettingMutation.mutate(pricingSettingId, {
      onSuccess: () => {
        setOpen(false);
        queryClient.invalidateQueries({
          queryKey: ["pricing_setting"],
        });
      },
    });
  };
  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              data and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deletePricingSettingMutation.isPending}
              className="bg-red-500 hover:bg-red-600"
              onClick={deleteHandler}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeletePricingSettingDialog;
