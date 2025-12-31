import { useState } from "react";
import { useGetRequestedVendors } from "../../services/useGetVendors";
import { useUpdateVendorPermission } from "../../services/useUpdateVendorPermission";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useQueryClient } from "@tanstack/react-query";
import { TiIconCheck, TiIconEye, TiIconTrash } from "../icons";
import VendorDetailsDrawer from "../vendorDetailsDrawer";

const VendorRequests = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [vendorId, setVendorId] = useState<number | any>();

  const { data: vendors, isPending } = useGetRequestedVendors();
  const vendorPermissionMutation = useUpdateVendorPermission();
  const queryClient = useQueryClient();

  const approveHandler = (vendorId: any) => {
    vendorPermissionMutation.mutate(
      { vendorId, status: "approved" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["requested_vendors"],
          });
        },
      }
    );
  };

  const rejectHandler = (vendorId: any) => {
    vendorPermissionMutation.mutate(
      { vendorId, status: "rejected" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["requested_vendors"],
          });
        },
      }
    );
  };

  const viewHandler = (vendorId: any) => {
    setOpenDrawer(true);
    setVendorId(vendorId);
  };

  return (
    <>
      {
        <VendorDetailsDrawer
          open={openDrawer}
          setOpen={setOpenDrawer}
          vendorId={vendorId}
        />
      }
      <div className=" space-y-3">
        <div className="max-w-[400px] bg-white overflow-x-scroll lg:overflow-hidden md:max-w-full p-3  border">
          <Table>
            <TableHeader className="text-[#89868D]  ">
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isPending && <div>Loading...</div>}
              {vendors?.data?.map((vendor: any, index: number) => (
                <TableRow key={vendor.vendorId} className=" ">
                  <TableCell className="text-[#89868D]">{index + 1}</TableCell>
                  <TableCell className="font-medium flex items-center  gap-3 text-[#89868D]">
                    <Avatar>
                      <AvatarFallback className="text-xs   p-2   rounded-full bg-slate-200">
                        {vendor.businessName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {vendor.businessName}
                  </TableCell>
                  <TableCell className="text-[#89868D]">
                    {vendor?.createdAt &&
                      new Date(vendor.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                  </TableCell>
                  <TableCell
                    className={` ${
                      vendor.status == "approved"
                        ? "text-green-500"
                        : vendor.status == "rejected"
                        ? "text-red-500"
                        : "text-[#89868D]"
                    }`}
                  >
                    {vendor.status}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => viewHandler(vendor.vendorId)}
                        className="bg-blue-500 text-white"
                      >
                        <TiIconEye />
                      </Button>
                      <Button
                        onClick={() => approveHandler(vendor.vendorId)}
                        className={`${
                          vendor.status == "approved"
                            ? "cursor-not-allowed opacity-30"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        <TiIconCheck />
                      </Button>
                      <Button
                        onClick={() => rejectHandler(vendor.vendorId)}
                        className={`${
                          vendor.status == "rejected"
                            ? "cursor-not-allowed opacity-30"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        <TiIconTrash />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default VendorRequests;
