import { useQuery } from "@tanstack/react-query";
import { getAllEventTypes } from "../helper/eventHandler";

export const useGetEventTypes = () => {
  return useQuery({
    queryKey: ["event_types"],
    queryFn: () => getAllEventTypes(),
  });
};
