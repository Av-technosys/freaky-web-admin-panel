import { Card, CardContent, CardDescription, CardFooter } from "../ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  useGetFeaturedBanner,
  useUpdateFeaturedBanner,
} from "../../services/useGetOrUpdateFeaturedBanner";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";

const FeaturedBanner = () => {
  //   const [bannerData, setBannerData] = useState<any>([]);
  const queryClient = useQueryClient();

  const { data: featuredBanner, isPending } = useGetFeaturedBanner();
  const updatePriorityMutation = useUpdateFeaturedBanner();

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
      }
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
      }
    );
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2 my-2">
        {isPending && "Loading..."}
        {featuredBanner?.data?.map((banner: any, index: number) => {
          return (
            <div className="col-span-1">
              <Card key={index}>
                <CardContent className="mt-7">
                  <CardDescription>
                    <div className="h-[30vh] w-full rounded-xl overflow-hidden border bg-gray-100">
                      <img
                        src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${
                          banner.mediaURL
                        }`}
                        alt={"image"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CardDescription>
                  <CardFooter className="p-2">
                    <div className="w-full h-[10vh]  flex items-end justify-between">
                      <Button
                        disabled={banner.priority === 1}
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
                        disabled={featuredBanner.count == index + 1}
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
