import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  useGetFeaturedProducts,
  useUpdateFeaturedProduct,
} from "../../services/useGetOrUpdateFeaturedProduct";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import AddFeaturedProductDialog from "../addFeaturedProductDialog";

const FeaturedProduct = () => {
  const queryClient = useQueryClient();
  const { data: featuredProducts, isPending } = useGetFeaturedProducts();

  const [openFeaturedProductDialog, setOpenFeaturedProductDialog] =
    useState(false);

  const updatePriorityMutation = useUpdateFeaturedProduct();

  const priorityIncreaseHandler = ({
    currentProduct,
    currentProductPriority,
    nextProductPriority,
    categoryId,
  }: any) => {
    updatePriorityMutation.mutate(
      {
        currentProduct,
        currentProductPriority,
        nextProductPriority,
        categoryId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["featured_products"],
          });
        },
      },
    );
  };

  const priorityDecreaseHandler = ({
    currentProduct,
    currentProductPriority,
    nextProductPriority,
    categoryId,
  }: any) => {
    updatePriorityMutation.mutate(
      {
        currentProduct,
        currentProductPriority,
        nextProductPriority,
        categoryId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["featured_products"],
          });
        },
      },
    );
  };

  const addFeaturedProductHandler = () => {
    setOpenFeaturedProductDialog(true);
  };

  return (
    <>
      {
        <AddFeaturedProductDialog
          open={openFeaturedProductDialog}
          setOpen={setOpenFeaturedProductDialog}
        />
      }
      {isPending && "Loading..."}
      {!isPending && featuredProducts?.data?.length === 0 && (
        <div>
          <div className="text-[#89868D] ">No featured product found..</div>
        </div>
      )}
      <div className="w-full flex items-center justify-end  my-2">
        <Button
          size="sm"
          onClick={() => addFeaturedProductHandler()}
          variant="destructive"
          className="rounded-lg"
        >
          Add Featured Product
        </Button>
      </div>
      {featuredProducts?.data?.map((product: any, index: number) => {
        return (
          <Card key={index} className="mb-4 ">
            <CardHeader>
              <CardTitle className=" font-bold">
                <div className="w-full flex items-center justify-between">
                  <div>
                    {index + 1}. {product?.title}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                <div className="grid grid-cols-3 pr-2 gap-2 my-2">
                  {product?.products?.map((item: any, index: number) => {
                    return (
                      <div className="col-span-1">
                        <Card key={index}>
                          <CardContent className="mt-7">
                            <CardDescription>
                              <div className="h-[30vh]  w-full rounded-xl overflow-hidden border bg-gray-100">
                                <img
                                  src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${
                                    item.image
                                  }`}
                                  alt={"image"}
                                  className="h-full w-full  object-cover"
                                />
                              </div>
                            </CardDescription>
                            <CardFooter className="p-2">
                              <div className="w-full h-[10vh]  flex items-end justify-between">
                                <Button
                                  disabled={
                                    item?.priority === 1 ||
                                    updatePriorityMutation.isPending
                                  }
                                  onClick={() =>
                                    priorityDecreaseHandler({
                                      currentProduct: item?.id,
                                      currentProductPriority: item?.priority,
                                      nextProductPriority: item?.priority - 1,
                                      categoryId: product.categoryId,
                                    })
                                  }
                                  className={`cursor-pointer ${
                                    item.priority == 1 &&
                                    "cursor-not-allowed opacity-40"
                                  }`}
                                  variant={"ghost"}
                                >
                                  <ArrowLeft />
                                </Button>
                                <div className="mb-1">{index + 1}</div>
                                <Button
                                  disabled={
                                    product.count == index + 1 ||
                                    updatePriorityMutation.isPending
                                  }
                                  onClick={() =>
                                    priorityIncreaseHandler({
                                      currentProduct: item.id,
                                      currentProductPriority: item.priority,
                                      nextProductPriority: item.priority + 1,
                                      categoryId: product.categoryId,
                                    })
                                  }
                                  className={`cursor-pointer ${
                                    product.count == index + 1 &&
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
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default FeaturedProduct;
