import { useState } from "react";
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

import { TiIconEye } from "../icons";
import VendorDetailsDrawer from "../vendorDetailsDrawer";
import { useGetVendors } from "../../services/useGetVendors";

const Vendors = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [vendorId, setVendorId] = useState<number | any>();

  const { data: vendors, isPending } = useGetVendors();

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

export default Vendors;
