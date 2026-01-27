import { TiIconX } from "./icons";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Label } from "./ui/label";
import { Link } from "react-router-dom";

const UserDetailsDrawer = ({ open, setOpen, userId }: any) => {
  const [userDetails, setUserDetails] = useState<any>({});

  const { data: userData, isPending } = useGetUserDetails(userId);

  useEffect(() => {
    setUserDetails(userData?.data);
  }, [userData, userId]);

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="data-[vaul-drawer-direction=right]:sm:max-w-[352px]">
          <div className=" w-full h-full bg-gray-50 overflow-y-scroll">
            <DrawerHeader>
              <DrawerTitle>
                <div className=" flex items-center justify-between  ">
                  <h2 className=" text-gray-600 font-bold ">User Details</h2>
                  <DrawerTrigger asChild>
                    <TiIconX size={18} className="text-gray-600" />
                  </DrawerTrigger>
                </div>
              </DrawerTitle>
            </DrawerHeader>
            {isPending && <div>Loading...</div>}
            <div className="px-4">
              <div className="flex items-center gap-4 mb-3">
                <div className="col-span-1">
                  <div className="size-12 flex items-center justify-center rounded-full overflow-hidden">
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
                </div>
              </div>
              <Separator />
              <Accordion
                type="single"
                collapsible
                defaultValue="shipping"
                className="max-w-lg"
              >
                <AccordionItem value="shipping">
                  <AccordionTrigger>Personal Details</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 my-2 gap-2">
                      <div className="col-span-1 flex flex-col text-gray-600">
                        <Label className="text-xs">Name</Label>
                        <p className="text-gray-700 ">
                          {userDetails?.firstName} {userDetails?.lastName}
                        </p>
                      </div>

                      <div className="col-span-1 flex flex-col  text-gray-600">
                        <div className="col-span-1 flex flex-col text-gray-600">
                          <Label className="text-xs">Email</Label>
                          <Link
                            to={`mailto:${userDetails?.email}`}
                            className="text-blue-700 underline"
                          >
                            {userDetails?.email}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 my-2 gap-2">
                      <div className="col-span-1 flex flex-col text-gray-600">
                        <Label className="text-xs">Phone Number</Label>
                        <span className="text-gray-700">
                          {userDetails?.number}
                        </span>
                      </div>

                      <div className="col-span-1 flex flex-col  text-gray-600">
                        <div className="col-span-1 flex flex-col text-gray-600">
                          <Label className="text-xs">Active</Label>
                          <span
                            className={`col-span-1 text-gray-600  ${
                              userDetails?.isActive == true
                                ? "text-green-500"
                                : userDetails?.isActive == false
                                  ? "text-red-500"
                                  : "text-[#89868D]"
                            }`}
                          >
                            {userDetails?.isActive == true ? "True" : "False"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UserDetailsDrawer;
