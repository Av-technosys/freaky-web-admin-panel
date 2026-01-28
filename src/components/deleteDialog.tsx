// import { useQueryClient } from "@tanstack/react-query";
// import { useDeleteEventType } from "../services/useUpdateOrCreateEventType";
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

    alert(
      "this part is commented because if we delete event types then the normal event associated with event type id shows error..",
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
