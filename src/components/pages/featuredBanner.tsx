import { Card, CardContent, CardDescription, CardFooter } from "../ui/card";
import { ArrowLeft, ArrowRight, Trash2 } from "lucide-react";
import {
  useDeleteFeaturedBanner,
  useGetFeaturedBanner,
  useUpdateFeaturedBanner,
} from "../../services/useGetOrUpdateFeaturedBanner";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import AddFeaturedBannerDialog from "../addFeaturedBannerDialog";

const FeaturedBanner = () => {
  //   const [bannerData, setBannerData] = useState<any>([]);
  const queryClient = useQueryClient();

  const [openAddFeaturedBannerDialog, setOpenAddFeaturedBannerDialog] =
    useState(false);

  const { data: featuredBanner, isPending } = useGetFeaturedBanner();
  const updatePriorityMutation = useUpdateFeaturedBanner();

  const deleteBannerMutation = useDeleteFeaturedBanner();

  //   console.log("old data", bannerData);

  //   useEffect(() => {
  //     setBannerData(featuredBanner?.data);
  //   }, [featuredBanner]);

  const priorityIncreaseHandler = ({
    currentBanner,
    currentBannerPriority,
    nextBannerPriority,
  }: any) => {
    // const updated = [...bannerData];
    // updated[index].priority = updated[index].priority + 1;
    // updated[index + 1].priority = updated[index + 1].priority - 1;

    // setBannerData(updated);
    updatePriorityMutation.mutate(
      {
        currentBanner,
        currentBannerPriority,
        nextBannerPriority,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["featured_banner"],
          });
        },
      },
    );
  };

  const priorityDecreaseHandler = ({
    currentBanner,
    currentBannerPriority,
    nextBannerPriority,
  }: any) => {
    // const updated = [...bannerData];
    // updated[index].priority = updated[index].priority + 1;
    // updated[index + 1].priority = updated[index + 1].priority - 1;

    // setBannerData(updated);
    updatePriorityMutation.mutate(
      {
        currentBanner,
        currentBannerPriority,
        nextBannerPriority,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["featured_banner"],
          });
        },
      },
    );
  };

  const deleteBannerHandler = (id: any, priority: any) => {
    deleteBannerMutation.mutate(
      { id, priority },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["featured_banner"],
          });
        },
      },
    );
  };

  return (
    <>
      {
        <AddFeaturedBannerDialog
          open={openAddFeaturedBannerDialog}
          setOpen={setOpenAddFeaturedBannerDialog}
        />
      }
      <div className="flex items-center justify-end px-2 my-2 ">
        <Button
          onClick={() => setOpenAddFeaturedBannerDialog(true)}
          size="sm"
          variant="destructive"
          className="rounded-lg"
        >
          Add Featured Banner
        </Button>
      </div>
      <div className="grid grid-cols-3 pr-2 gap-2 my-2">
        {isPending && "Loading..."}
        {!isPending && featuredBanner?.data?.length === 0 && (
          <div>
            <div className="text-[#89868D] ">No featured banner found..</div>
          </div>
        )}
        {featuredBanner?.data?.map((banner: any, index: number) => {
          return (
            <div className="col-span-1">
              <Card key={index}>
                <CardContent className="mt-7">
                  <CardDescription>
                    <div className="h-[30vh] relative group w-full rounded-xl overflow-hidden border bg-gray-100">
                      <img
                        src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${
                          banner.mediaURL
                        }`}
                        alt={"image"}
                        className="h-full w-full opacity-100 group-hover:opacity-65 transition object-cover"
                      />
                      <Button
                        size="sm"
                        disabled={deleteBannerMutation.isPending}
                        onClick={() => {
                          deleteBannerHandler(banner.id, banner.priority);
                        }}
                        variant="destructive"
                        className="absolute hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer  group-hover:flex rounded-lg"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardDescription>
                  <CardFooter className="p-2">
                    <div className="w-full h-[10vh]  flex items-end justify-between">
                      <Button
                        disabled={
                          banner.priority === 1 ||
                          updatePriorityMutation.isPending
                        }
                        onClick={() =>
                          priorityDecreaseHandler({
                            currentBanner: banner.id,
                            currentBannerPriority: banner.priority,
                            nextBannerPriority: banner.priority - 1,
                          })
                        }
                        className={`cursor-pointer ${
                          banner.priority == 1 &&
                          "cursor-not-allowed opacity-40"
                        }`}
                        variant={"ghost"}
                      >
                        <ArrowLeft />
                      </Button>
                      <div className="mb-1">{index + 1}</div>
                      <Button
                        disabled={
                          featuredBanner.count == index + 1 ||
                          updatePriorityMutation.isPending
                        }
                        onClick={() =>
                          priorityIncreaseHandler({
                            currentBanner: banner.id,
                            currentBannerPriority: banner.priority,
                            nextBannerPriority: banner.priority + 1,
                          })
                        }
                        className={`cursor-pointer ${
                          featuredBanner.count == index + 1 &&
                          "cursor-not-allowed opacity-40"
                        }`}
                        variant={"ghost"}
                      >
                        <ArrowRight />
                      </Button>
                    </div>
                  </CardFooter>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FeaturedBanner;
