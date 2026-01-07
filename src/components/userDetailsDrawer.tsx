import { TiIconX } from "./icons";
import { Card } from "./ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Separator } from "./ui/separator";
import { useGetUserDetails } from "../services/useGetVendors";
import { useEffect, useState } from "react";

const UserDetailsDrawer = ({ open, setOpen, userId }: any) => {
  const [userDetails, setUserDetails] = useState<any>({});

  const { data: userData, isPending } = useGetUserDetails(userId);

  useEffect(() => {
    setUserDetails(userData?.data);
  }, [userData, userId]);

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent>
          <div className=" w-full h-full bg-[#fff6e3] overflow-y-scroll">
            <DrawerHeader>
              <DrawerTitle>
                <div className=" flex items-center justify-between  ">
                  <h2 className="text-lg text-gray-600 font-bold ">
                    User Details
                  </h2>
                  <DrawerTrigger asChild>
                    <TiIconX className="text-gray-600" />
                  </DrawerTrigger>
                </div>
              </DrawerTitle>
            </DrawerHeader>
            {isPending && <div>Loading...</div>}
            <div className="px-4">
              <div className="grid grid-cols-4 gap-5 mb-3">
                <div className="col-span-1">
                  <div className="w-full h-full flex items-center justify-center rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${
                        userDetails?.profileImage
                      }`}
                      alt="profile-picture"
                    />
                  </div>
                </div>
                <div className="col-span-3 flex flex-col items-start justify-center">
                  <div className="text-xl font-bold ">
                    {userDetails?.firstName} {userDetails?.lastName}
                  </div>
                  <div className="text-gray-600 text-sm text-start">
                    Created at:{" "}
                    {userDetails?.createdAt &&
                      new Date(userDetails.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                  </div>
                </div>
              </div>
              <Separator />
              <Card className="my-4 p-2">
                <h2 className="text-lg text-gray-600 font-bold ">
                  Personal Details :-
                </h2>
                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">Name </div>
                  <div className="col-span-1 text-gray-600 text-end ">
                    {userDetails?.firstName} {userDetails?.lastName}
                  </div>
                </div>
                <div className="grid grid-cols-3 my-2">
                  <div className="col-span-1 font-semibold">Email</div>
                  <div className="col-span-2 text-gray-600 text-end break-all">
                    {userDetails?.email}
                  </div>
                </div>

                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">Phone Number </div>
                  <div className="col-span-1 text-gray-600 text-end ">
                    {userDetails?.number}
                  </div>
                </div>
                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">Active </div>
                  <div
                    className={`col-span-1 text-gray-600 text-end ${
                      userDetails?.isActive == true
                        ? "text-green-500"
                        : userDetails?.isActive == false
                        ? "text-red-500"
                        : "text-[#89868D]"
                    }`}
                  >
                    {userDetails?.isActive == true ? "True" : "False"}
                  </div>
                </div>
                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">Status </div>
                  <div
                    className={`col-span-1 text-gray-600 text-end ${
                      userDetails?.status == true
                        ? "text-green-500"
                        : userDetails?.status == false
                        ? "text-red-500"
                        : "text-[#89868D]"
                    }`}
                  >
                    {userDetails?.status == true ? "True" : "False"}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UserDetailsDrawer;
