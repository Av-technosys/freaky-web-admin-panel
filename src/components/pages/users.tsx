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

const Users = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userId, setUserId] = useState<number | any>();

  const { data: users, isPending } = useGetUsers();

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
              {users?.data?.map((user: any, index: number) => (
                <TableRow key={user.userId} className=" ">
                  <TableCell className="text-[#89868D]">{index + 1}</TableCell>
                  <TableCell className="font-medium flex items-center  gap-3 text-[#89868D]">
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
                        onClick={() => viewHandler(user.userId)}
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

export default Users;
