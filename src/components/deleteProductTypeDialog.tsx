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
import { useDeleteProductType } from "../services/useUpdateOrCreateProductType";

export function DeleteProductTypeDialog({ open, setOpen, productTypeId }: any) {
  const deleteProductTypeMutation = useDeleteProductType();
  const queryClient = useQueryClient();

  const deleteHandler = () => {
    deleteProductTypeMutation.mutate(productTypeId, {
      onSuccess: () => {
        setOpen(false);
        queryClient.invalidateQueries({
          queryKey: ["product_type"],
        });
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your data
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={deleteHandler}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
