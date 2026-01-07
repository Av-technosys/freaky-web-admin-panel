import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteReviewHandler,
  getAllUserReviews,
  getReviewById,
} from "../helper/reviewHandler";
import { toast } from "sonner";

export const useGetUserReviews = () => {
  return useInfiniteQuery({
    queryKey: ["reviews"],
    queryFn: ({ pageParam }) => getAllUserReviews({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextPage : undefined;
    },
  });
};

export const useGetReviewById = (reviewId: number) => {
  return useQuery({
    queryKey: ["review-by-id", reviewId],
    queryFn: () => getReviewById(reviewId),
  });
};

export const useDeleteUserReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReviewHandler,
    onSuccess: () => {
      toast.success("User Review Deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: () => {
      toast.error("Unable to delete user review");
    },
  });
};
