import { Pencil, Trash2 } from "lucide-react";
import { useGetFeaturedCategories } from "../../services/useGetAndCreateAndUpdateFeaturedCategory";
import { Button } from "../ui/button";
import AddOrEditFeaturedCategoryDialog from "../addOrEditFeaturedCategoryDialog";
import { useState } from "react";
import DeleteCategoryDialog from "../deleteCategoryDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const FeaturedCategory = () => {
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categoryDetails, setCategoryDetails] = useState("");
  const { data: featuredCategories, isPending } = useGetFeaturedCategories();

  const editHandler = (details: any) => {
    setOpenCategoryDialog(true);
    setCategoryDetails(details);
  };

  const deleteHandler = (id: any) => {
    setOpenDeleteDialog(true);
    setCategoryId(id);
  };

  return (
    <>
      {
        <AddOrEditFeaturedCategoryDialog
          open={openCategoryDialog}
          setOpen={setOpenCategoryDialog}
          categoryDetails={categoryDetails}
        />
      }
      {
        <DeleteCategoryDialog
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          categoryId={categoryId}
        />
      }
      <div className="flex items-center justify-end px-2 my-2 ">
        <Button
          onClick={() => {
            setOpenCategoryDialog(true);
            setCategoryDetails("");
          }}
          size="sm"
          variant="destructive"
          className="rounded-lg"
        >
          Add Featured Category
        </Button>
      </div>
      <div className="w-full  pr-2">
        {isPending && "Loading..."}
        {!isPending && featuredCategories?.data?.length === 0 && (
          <div>
            <div className="text-[#89868D] ">No featured category found..</div>
          </div>
        )}

        <Table className="border w-full">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Category Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {featuredCategories?.data?.map((category: any) => {
              const firstLetter = category.name.charAt(0).toUpperCase();

              return (
                <TableRow key={category.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center font-semibold text-red-600">
                        {firstLetter}
                      </div>

                      <div>
                        <div className="font-medium text-gray-900">
                          {category.name}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="w-[350px]">
                    <div className="max-h-20 overflow-y-auto text-sm text-gray-600">
                      {category.description}
                    </div>
                  </TableCell>

                  <TableCell className="text-sm text-gray-500">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-4">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => editHandler(category)}
                      >
                        <Pencil size={16} />
                      </Button>

                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => deleteHandler(category.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default FeaturedCategory;
