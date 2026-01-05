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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { useNavigate, useSearchParams } from "react-router-dom";

const Vendors = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [vendorId, setVendorId] = useState<number | any>();

  const navigate = useNavigate();
  const pageSize = 8;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data: vendors, isPending } = useGetVendors(page, pageSize);

  const totalPages = vendors?.pagination?.total_pages;

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

              {vendors?.data?.map((vendor: any, index: number) => {
                const rowNumber = (page - 1) * pageSize + (index + 1);

                return (
                  <TableRow key={vendor.vendorId} className=" ">
                    <TableCell className="text-[#89868D]">
                      {rowNumber}
                    </TableCell>
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
                          variant={"outline"}
                          onClick={() => viewHandler(vendor.vendorId)}
                          className="border-none text-blue-500"
                        >
                          <TiIconEye />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="my-5">
        <Pagination>
          <PaginationContent>
            <PaginationItem className="border border-gray-200 rounded-md">
              <PaginationPrevious
                className={`cursor-pointer ${
                  page == 1 && "pointer-events-none opacity-50"
                }`}
                onClick={() =>
                  navigate(`?page=${page - 1}&page_size=${pageSize}`)
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, index: any) => {
              return (
                <PaginationItem
                  onClick={() =>
                    navigate(`?page=${index + 1}&page_size=${pageSize}`)
                  }
                  className={`border border-gray-200 rounded-md ${
                    page == index + 1 && "text-orange-500"
                  }`}
                >
                  <PaginationLink href="#">{index + 1}</PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem className="border border-gray-200 rounded-md">
              <PaginationNext
                className={`cursor-pointer  ${
                  page == totalPages && "pointer-events-none opacity-50"
                }`}
                onClick={() =>
                  navigate(`?page=${page + 1}&page_size=${pageSize}`)
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default Vendors;
