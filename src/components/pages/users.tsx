import { useEffect, useState } from "react";
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
import { TiIconEye, TiIconSearch } from "../icons";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

export function useDebounce<T>(value: T, delay = 600): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const Users = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userId, setUserId] = useState<number | any>();

  const navigate = useNavigate();
  const pageSize = 8;
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [searchText, setSearchText] = useState("");

  const debouncedSearch = useDebounce(searchText, 800);

  const { data: users, isPending } = useGetUsers(
    page,
    pageSize,
    debouncedSearch,
  );

  const totalPages = users?.pagination?.total_pages;

  const viewHandler = (userId: any) => {
    setOpenDrawer(true);
    setUserId(userId);
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }
  return (
    <>
      {
        <UserDetailsDrawer
          open={openDrawer}
          setOpen={setOpenDrawer}
          userId={userId}
        />
      }
      <div className="max-w-xs ml-auto my-2 mr-2">
        <InputGroup className="flex items-center  bg-white rounded-full   py-2 shadow-none">
          <InputGroupAddon>
            <TiIconSearch className="text-gray-500" />
          </InputGroupAddon>

          <InputGroupInput
            onChange={handleInputChange}
            value={searchText}
            type="text"
            placeholder="Search By First Name"
            className="bg-transparent  focus:outline-none w-32 focus:w-56 transition-all duration-200"
          />
        </InputGroup>
      </div>

      <div className=" space-y-3 pr-2">
        <div className="max-w-[400px] rounded-md  bg-white overflow-x-scroll lg:overflow-hidden md:max-w-full p-3  border">
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
              {!isPending && users?.data?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-[#89868D] py-6"
                  >
                    No user found..
                  </TableCell>
                </TableRow>
              )}
              {users?.data?.map((user: any, index: number) => {
                const rowNumber = (page - 1) * pageSize + (index + 1);

                return (
                  <TableRow key={user.userId} className="hover:bg-gray-50">
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
                          className="border-none shadow-none cursor-pointer text-blue-500"
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
