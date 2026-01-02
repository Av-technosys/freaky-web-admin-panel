import { useQueryClient } from "@tanstack/react-query";
import { useDeleteEventType } from "../services/useUpdateOrCreateEventType";
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

export function DeleteEventTypeDialog({ open, setOpen, eventTypeId }: any) {
  const deleteEventTypeMutation = useDeleteEventType();
  const queryClient = useQueryClient();

  const deleteHandler = () => {
    deleteEventTypeMutation.mutate(eventTypeId, {
      onSuccess: () => {
        setOpen(false);
        queryClient.invalidateQueries({
          queryKey: ["event_types"],
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
          <AlertDialogAction onClick={deleteHandler}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
