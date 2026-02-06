import { useRef, useState } from "react";
import { useGetUserReviews } from "../../services/useGetAndDeleteUserReviews";
import { ProfilePicture } from "../common/profilePicture";
import { TiIconStarFilled } from "../icons";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ReviewsDrawer } from "../reviewsDrawer";
import { DeleteReviewDialog } from "../deleteReviewDialog";

const Reviews = () => {
  const {
    data: reviews,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUserReviews();

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    if (
      scrollTop + clientHeight >= scrollHeight - 10 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [reviewId, setReviewId] = useState();

  const drawerHandler = (id: any) => {
    setOpenDrawer(true);
    setReviewId(id);
  };

  const deleteHandler = (id: any) => {
    setOpenPopup(true);
    setReviewId(id);
  };

  return (
    <>
      {openDrawer && (
        <ReviewsDrawer
          open={openDrawer}
          setOpen={setOpenDrawer}
          reviewId={reviewId}
        />
      )}
      {openPopup && (
        <DeleteReviewDialog
          open={openPopup}
          setOpen={setOpenPopup}
          reviewId={reviewId}
        />
      )}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full h-[95vh] overflow-y-auto mt-3  grid grid-cols-3 gap-2 pr-2"
      >
        {isPending && <div>Loading...</div>}
        {!isPending && reviews?.pages?.length === 0 && (
          <div>
            <div className="text-center text-[#89868D] py-6">
              No review found..
            </div>
          </div>
        )}
        {reviews?.pages?.map((page: any) => {
          return page?.data?.map((review: any, index: number) => {
            return (
              <>
                <div key={index} className="col-span-1 group ">
                  <Card className="shadow-none group-hover:shadow bg-gray-50 ">
                    <CardHeader>
                      <CardTitle className="w-full flex items-center justify-between">
                        <div className="  flex items-center  gap-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <ProfilePicture
                              url={review?.userImage}
                              name={review?.userName}
                            />
                          </div>
                          <div className=" flex flex-col gap-0">
                            <span className="text-sm font-semibold">
                              {review?.userName}
                            </span>
                            <span className="text-xs font-semibold text-gray-600">
                              {new Date(review?.createdAt).toDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          {Array(review?.rating)
                            .fill(0)
                            .map((_, index) => {
                              return (
                                <TiIconStarFilled
                                  key={index}
                                  size="14"
                                  color="gold"
                                />
                              );
                            })}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className=" line-clamp-3">
                      {review?.description}
                    </CardContent>
                    <CardFooter className="w-full items-center justify-end gap-2 ">
                      <Button
                        onClick={() => drawerHandler(review?.id)}
                        className="text-yellow-500 cursor-pointer border-yellow-500 px-1 shadow-none"
                        variant="link"
                      >
                        View More
                      </Button>
                      <Button
                        onClick={() => deleteHandler(review?.id)}
                        className="text-red-500 cursor-pointer border-red-500 px-1 shadow-none"
                        variant="link"
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </>
            );
          });
        })}
      </div>
    </>
  );
};

export default Reviews;
