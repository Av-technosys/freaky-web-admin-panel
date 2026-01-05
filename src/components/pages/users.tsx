import { useState } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGetUsers } from "../../services/useGetVendors";
import { TiIconEye } from "../icons";
import UserDetailsDrawer from "../userDetailsDrawer";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { useNavigate, useSearchParams } from "react-router-dom";

const Users = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userId, setUserId] = useState<number | any>();

  const navigate = useNavigate();
  const pageSize = 8;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data: users, isPending } = useGetUsers(page, pageSize);

  const totalPages = users?.pagination?.total_pages;

  const viewHandler = (userId: any) => {
    setOpenDrawer(true);
    setUserId(userId);
  };
  return (
    <>
      {
        <UserDetailsDrawer
          open={openDrawer}
          setOpen={setOpenDrawer}
          userId={userId}
        />
      }

      <div className=" space-y-3">
        <div className="max-w-[400px] bg-white overflow-x-scroll lg:overflow-hidden md:max-w-full p-3  border">
          <Table>
            <TableHeader className="text-[#89868D]  ">
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isPending && <div>Loading...</div>}
              {users?.data?.map((user: any, index: number) => {
                const rowNumber = (page - 1) * pageSize + (index + 1);

                return (
                  <TableRow key={user.userId} className=" ">
                    <TableCell className="text-[#89868D]">
                      {rowNumber}
                    </TableCell>
                    <TableCell className="font-medium  text-[#89868D]">
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell className="text-[#89868D]">
                      {user.number}
                    </TableCell>
                    <TableCell className="text-[#89868D]">
                      {user?.createdAt &&
                        new Date(user.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                    </TableCell>
                    <TableCell
                      className={` ${
                        user.isActive == true
                          ? "text-green-500"
                          : user.isActive == false
                          ? "text-red-500"
                          : "text-[#89868D]"
                      }`}
                    >
                      {user.isActive == true ? "True" : "False"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant={"outline"}
                          onClick={() => viewHandler(user.userId)}
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

export default Users;
