import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGetPricingSetting } from "../../services/useGetOrUpdateOrCreateOrDeletePricingSetting";
import { useState } from "react";
import AddOrEditPricingSettingDialog from "../addOrEditPricingSettingDialog";
import DeletePricingSettingDialog from "../deletePricingSettingDialog";

const PricingSetting = () => {
  const { data: pricingSettings, isPending } = useGetPricingSetting();
  const [openPricingSettingDialog, setOpenPricingSettingDialog] =
    useState(false);
  const [pricingSettingDetails, setPricingSettingDetails] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [pricingSettingId, setPricingSettingId] = useState("");

  const editHandler = (details: any) => {
    setOpenPricingSettingDialog(true);
    setPricingSettingDetails(details);
  };

  const deleteHandler = (id: any) => {
    setOpenDeleteDialog(true);
    setPricingSettingId(id);
  };

  return (
    <>
      {
        <AddOrEditPricingSettingDialog
          open={openPricingSettingDialog}
          setOpen={setOpenPricingSettingDialog}
          pricingDetails={pricingSettingDetails}
        />
      }
      {
        <DeletePricingSettingDialog
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          pricingSettingId={pricingSettingId}
        />
      }
      <div className="flex items-center justify-end px-2 my-2 ">
        <Button
          onClick={() => {
            setOpenPricingSettingDialog(true);
            setPricingSettingDetails("");
          }}
          size="sm"
          variant="destructive"
          className="rounded-lg"
        >
          Add Pricing Setting
        </Button>
      </div>
      <div className="w-full  pr-2">
        <Table className="border w-full">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Pricing Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Fee Percentage</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isPending && "Loading..."}
            {!isPending && pricingSettings?.data?.length === 0 && (
              <div>
                <div className="text-[#89868D] ">
                  No Pricing setting found..
                </div>
              </div>
            )}
            {pricingSettings?.data?.map((pricing: any) => {
              const firstLetter = pricing.name.charAt(0).toUpperCase();

              return (
                <TableRow key={pricing.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center font-semibold text-red-600">
                        {firstLetter}
                      </div>

                      <div>
                        <div className="font-medium text-gray-900">
                          {pricing.name}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="w-[300px]">
                    <div className="max-h-20 overflow-y-auto text-sm text-gray-600">
                      {pricing.description}
                    </div>
                  </TableCell>

                  <TableCell className="text-sm text-gray-500">
                    {pricing.feePercentage}%
                  </TableCell>

                  <TableCell className="text-sm text-gray-500">
                    {new Date(pricing.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-4">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => editHandler(pricing)}
                      >
                        <Pencil size={16} />
                      </Button>

                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => deleteHandler(pricing.id)}
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

export default PricingSetting;
