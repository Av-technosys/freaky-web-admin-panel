import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createEventTypeHandler,
  deleteEventTypeHandler,
  updateEventTypeHandler,
} from "../helper/eventHandler";

export const useCreateEventType = () => {
  return useMutation({
    mutationFn: createEventTypeHandler,
    onSuccess: () => {
      toast.success("Event Type created successfully.");
    },
    onError: () => {
      toast.error("Unable to create event type");
    },
  });
};

export const useUpdateEventType = () => {
  return useMutation({
    mutationFn: updateEventTypeHandler,
    onSuccess: () => {
      toast.success("Event Type updated successfully.");
    },
    onError: () => {
      toast.error("Unable to update event type");
    },
  });
};

export const useDeleteEventType = () => {
  return useMutation({
    mutationFn: deleteEventTypeHandler,
    onSuccess: () => {
      toast.success("Event Type Deleted successfully.");
    },
    onError: () => {
      toast.error("Unable to delete event type");
    },
  });
};
