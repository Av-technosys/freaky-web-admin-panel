import { useQuery } from "@tanstack/react-query";
import { getAllVendors } from "../helper/vendorHandler";

export const useGetVendors = () => {
  return useQuery({
    queryKey: ["vendors"],
    queryFn: () => getAllVendors(),
  });
};
