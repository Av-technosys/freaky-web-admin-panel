import { useState } from "react";
import { useGetProductTypes } from "../../services/useGetProductType";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import EditProductTypeDialog from "../editProductTypeDialog";
import { DeleteProductTypeDialog } from "../deleteProductTypeDialog";
import AddProductTypeDialog from "../addProductTypeDialog";

const ProductTypes = () => {
  const [openEditProductDialog, setOpenEditProductDialog] = useState(false);
  const [productTypeDetails, setProductTypeDetails] = useState();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productTypeId, setProductTypeId] = useState();
  const [openAddProductTypeDialog, setOpenAddProductTypeDialog] =
    useState(false);

  const { data: productTypes, isPending } = useGetProductTypes();

  const editHandler = (productTypeDetails: any) => {
    setOpenEditProductDialog(true);
    setProductTypeDetails(productTypeDetails);
  };

  const deleteHandler = (eventTypeId: any) => {
    setProductTypeId(eventTypeId);
    setDeleteDialogOpen(true);
  };

  return (
    <>
      {
        <>
          <AddProductTypeDialog
            open={openAddProductTypeDialog}
            setOpen={setOpenAddProductTypeDialog}
          />
          <EditProductTypeDialog
            open={openEditProductDialog}
            setOpen={setOpenEditProductDialog}
            productTypeDetails={productTypeDetails}
          />
          <DeleteProductTypeDialog
            open={deleteDialogOpen}
            setOpen={setDeleteDialogOpen}
            productTypeId={productTypeId}
          />
        </>
      }
      <div className="flex items-center justify-end px-2 my-2 ">
        <Button
          onClick={() => setOpenAddProductTypeDialog(true)}
          size="sm"
          variant="destructive"
          className="rounded-lg"
        >
          Add Product Type
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2 pr-2 mb-2">
        {isPending && <div>Loading...</div>}
        {!isPending && productTypes?.data?.length === 0 && (
          <div>
            <div className="text-center text-[#89868D] py-6">
              No product types found..
            </div>
          </div>
        )}
        {productTypes?.data?.map((productType: any, index: number) => {
          return (
            <>
              <Card
                key={index}
                className="group rounded-2xl border border-gray-200 bg-gray-50 shadow-none hover:shadow transition-all"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl overflow-hidden border bg-gray-100">
                      <img
                        src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${
                          productType?.mediaURL
                        }`}
                        alt={productType?.altText}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col ">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {productType?.name}
                      </h3>

                      <span className="text-xs text-gray-500">
                        Created on{" "}
                        {productType?.createdAt &&
                          new Date(productType.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                      </span>
                      <div className="text-[11px] text-gray-500">
                        New Product Approval :{" "}
                        <span
                          className={`${
                            productType.isNewProductApproval == true
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {" "}
                          {productType.isNewProductApproval == true
                            ? "Yes"
                            : "No"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <div className="mx-6 border-t" />

                <CardContent className="h-16 break-all overflow-y-auto">
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {productType?.description}
                  </p>
                </CardContent>

                <CardFooter className="flex justify-end gap-3 pt-0">
                  <Button
                    onClick={() => editHandler(productType)}
                    className="text-yellow-500 cursor-pointer border-yellow-500 px-1 shadow-none"
                    variant="link"
                  >
                    Edit
                  </Button>

                  <Button
                    onClick={() => deleteHandler(productType.id)}
                    className="text-red-500 cursor-pointer border-red-500 px-1 shadow-none"
                    variant="link"
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ProductTypes;
