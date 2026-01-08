import { useQuery } from "@tanstack/react-query";
import { getAllProductTypes } from "../helper/productHandler";

export const useGetProductTypes = () => {
  return useQuery({
    queryKey: ["product_type"],
    queryFn: () => getAllProductTypes(),
  });
};
