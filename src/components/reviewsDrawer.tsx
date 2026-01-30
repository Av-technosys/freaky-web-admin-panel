import { useEffect, useState } from "react";
import { Sheet, SheetContent } from "./ui/sheet";
import { SidebarGroup } from "./ui/sidebar";
import { ProfilePicture } from "./common/profilePicture";
import { TiIconStarFilled } from "./icons";
import { useGetReviewById } from "../services/useGetAndDeleteUserReviews";

type reviewDrawerProps = {
  open: any;
  setOpen: any;
  reviewId: number | undefined;
};

export function ReviewsDrawer({ open, setOpen, reviewId }: reviewDrawerProps) {
  const { data, isPending } = useGetReviewById(reviewId!);

  const [reviewData, setReviewData] = useState<any>();
  useEffect(() => {
    setReviewData(data?.data[0]);
  }, [data]);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className=" duration-200!">
        <div className=" w-full h-full">
          <SidebarGroup>
            <div className="text-xl">Details</div>
          </SidebarGroup>

          {isPending ? (
            <div>Loading...</div>
          ) : !isPending && reviewData === "" ? (
            <div className="px-5 text-[#89868D]">No review details found..</div>
          ) : (
            <div className="  h-full w-full pb-5  overflow-y-auto">
              <div className=" border my-4 rounded-xl shadow-xs  w-full flex items-center gap-3 justify-between  ">
                <div className="p-2">
                  <div className="h-12 w-12  rounded-full overflow-hidden">
                    <ProfilePicture
                      url={reviewData?.userImage}
                      name={reviewData?.userFirstName}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-0">
                  <p className="text-gray-800 text-lg ">
                    {reviewData?.userFirstName + " " + reviewData?.userLastName}
                  </p>
                  <p className="text-gray-600 text-sm font-medium">
                    Jaipur Rajasthan
                  </p>
                </div>
              </div>
              <div>
                <div className=" w-full py-3  flex flex-col gap-2  items-start ">
                  <div className="w-full flex flex-col ">
                    <div className=" flex w-full justify-between ">
                      <Heading>User Reviews</Heading>
                      <span className=" text-black">
                        {" "}
                        {new Date(reviewData?.createdAt).toDateString()}
                      </span>
                    </div>
                    <div className=" flex items-center gap-2">
                      <div className="flex gap-1">
                        {Array(reviewData?.rating)
                          .fill(0)
                          .map((_, index) => {
                            return (
                              <TiIconStarFilled
                                key={index}
                                size="20"
                                color="gold"
                              />
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  <div className=" mt-3">
                    <Heading>Service Name</Heading>
                    <Text>Lorem, ipsum dolor.</Text>
                  </div>
                  <div className=" mt-3">
                    <Heading>Comment</Heading>
                    <Text>{reviewData?.description}</Text>
                  </div>
                  {reviewData?.reviewMedia?.length > 0 && (
                    <div className="mt-3">
                      <Heading>Photos:</Heading>
                      <div className="w-full grid grid-cols-3 mt-3 gap-2">
                        {reviewData?.reviewMedia?.map(
                          (item: any, index: number) => {
                            return (
                              <div
                                key={index}
                                className=" w-full flex justify-center items-center"
                              >
                                <img
                                  src={`${
                                    import.meta.env.VITE_IMAGE_BASE_URL
                                  }/${item.mediaUrl}`}
                                  alt={reviewData.userFirstName}
                                />
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

const Heading = ({ children }: { children: React.ReactNode }) => {
  return <p className=" text-black text-base font-semibold">{children}</p>;
};

const Text = ({ children }: { children: React.ReactNode }) => {
  return <p className=" text-black ">{children}</p>;
};
