// import { useQueryClient } from "@tanstack/react-query";
// import { useDeleteEventType } from "../services/useUpdateOrCreateEventType";
import { toast } from "sonner";
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
  // const deleteEventTypeMutation = useDeleteEventType();
  // const queryClient = useQueryClient();
  console.log(eventTypeId);

  const deleteHandler = () => {
    // deleteEventTypeMutation.mutate(eventTypeId, {
    //   onSuccess: () => {
    //     setOpen(false);
    //     queryClient.invalidateQueries({
    //       queryKey: ["event_types"],
    //     });
    //   },
    // });
    toast.error(
      "When an event type is deleted, normal events linked to its eventTypeId break.",
      {
        style: {
          color: "#991b1b",
          border: "1px solid #ef4444",
        },
      },
    );
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
