import { NavLink } from "react-router-dom";
import {
  TiIconFacebook,
  TiIconInstagram,
  TiIconLinkedin,
  TiIconMenu2,
  TiIconWebsite,
  TiIconX,
  TiIconYoutube,
} from "./icons";
import { Card } from "./ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const VendorDetailsDrawer = ({ open, setOpen, vendorDetails }: any) => {
  return (
    <>
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent>
          <div className=" w-full h-full  overflow-y-scroll">
            <DrawerHeader>
              <DrawerTitle>
                <div className=" flex items-center justify-between  ">
                  <h2 className="text-lg text-gray-600 font-bold ">
                    Vendor Details
                  </h2>
                  <DrawerTrigger asChild>
                    <TiIconX className="text-gray-600" />
                  </DrawerTrigger>
                </div>
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4">
              <div className="grid grid-cols-4 gap-5 mb-3">
                <div className="col-span-1">
                  <div className="w-full h-full flex items-center justify-center rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${
                        vendorDetails?.logo_url
                      }`}
                      alt="profile-picture"
                    />
                  </div>
                </div>
                <div className="col-span-3 flex flex-col items-start justify-center">
                  <div className="text-xl font-bold ">
                    {vendorDetails?.business_name}
                  </div>
                  <div className="text-gray-600 text-sm text-start">
                    {vendorDetails?.city},{vendorDetails?.state}
                  </div>
                </div>
              </div>
              <Separator />
              <Card className="my-4 p-2">
                <h2 className="text-lg text-gray-600 font-bold ">
                  Business Information :-
                </h2>
                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">Business Type </div>
                  <div className="col-span-1 text-gray-600 text-end ">
                    {vendorDetails?.business_type}
                  </div>
                </div>
                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">DBA Name </div>
                  <div className="col-span-1 text-gray-600 text-end ">
                    {vendorDetails?.dba_name}
                  </div>
                </div>
                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">EIN Number </div>
                  <div className="col-span-1 text-gray-600 text-end">
                    {vendorDetails?.ein_number}
                  </div>
                </div>
                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">
                    Legal Entity Name{" "}
                  </div>
                  <div className="col-span-1 text-gray-600 text-end ">
                    {vendorDetails?.legal_entity_name}
                  </div>
                </div>
                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">
                    Incorporation Date
                  </div>
                  <div className="col-span-1 text-gray-600 text-end ">
                    {vendorDetails?.incorporation_date &&
                      new Date(
                        vendorDetails?.incorporation_date
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                  </div>
                </div>
              </Card>
              <Card className="my-4 p-2">
                <h2 className="text-lg text-gray-600 font-bold ">
                  Personal Details :-
                </h2>
                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">Contact Name </div>
                  <div className="col-span-1 text-gray-600 text-end ">
                    {vendorDetails?.primary_contact_name}
                  </div>
                </div>
                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">Email</div>
                  <div className="col-span-1 text-gray-600 text-end break-all">
                    {vendorDetails?.primary_contact_email}
                  </div>
                </div>

                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">Phone Number </div>
                  <div className="col-span-1 text-gray-600 text-end ">
                    {vendorDetails?.primary_phone_number}
                  </div>
                </div>
                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">Address 1 </div>
                  <div className="col-span-1 text-gray-600 text-end ">
                    {vendorDetails?.street_address_line1}
                  </div>
                </div>
                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">Address 2 </div>
                  <div className="col-span-1 text-gray-600 text-end ">
                    {vendorDetails?.street_address_line2}
                  </div>
                </div>
              </Card>

              <Card className="my-4 p-2">
                <h2 className="text-lg text-gray-600 font-bold ">
                  Bank Details :-
                </h2>
                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">Bank Name </div>
                  <div className="col-span-1 text-gray-600 text-end ">
                    {vendorDetails?.bank_name}
                  </div>
                </div>
                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">
                    Account Number{" "}
                  </div>
                  <div className="col-span-1 text-gray-600 text-end ">
                    {vendorDetails?.bank_account_number}
                  </div>
                </div>
                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">Bank Type </div>
                  <div className="col-span-1 text-gray-600 text-end ">
                    {vendorDetails?.bank_type}
                  </div>
                </div>
                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">Payee Name </div>
                  <div className="col-span-1 text-gray-600 text-end">
                    {vendorDetails?.payee_name}
                  </div>
                </div>
                <div className="grid grid-cols-2 my-2">
                  <div className="col-span-1 font-semibold">
                    Routing Number{" "}
                  </div>
                  <div className="col-span-1 text-gray-600 text-end">
                    {vendorDetails?.routing_number}
                  </div>
                </div>
              </Card>

              <Card className="my-4 p-2">
                <h2 className="text-lg text-gray-600 font-bold ">
                  Ownership Details :-
                </h2>
                {vendorDetails?.ownershipdetails?.map(
                  (owner: any, index: number) => {
                    return (
                      <>
                        <Separator className="my-3" />
                        <div key={index}>
                          <h2 className="text-lg text-gray-600 font-bold ">
                            Owner {index + 1}
                          </h2>
                          <div className="grid grid-cols-2 my-2">
                            <div className="col-span-1 font-semibold">
                              Name{" "}
                            </div>
                            <div className="col-span-1 text-gray-600 text-end ">
                              {owner?.first_name}
                              {owner?.last_name}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 my-2">
                            <div className="col-span-1 font-semibold">
                              SSN Number{" "}
                            </div>
                            <div className="col-span-1 text-gray-600 text-end ">
                              {owner?.ssn_number}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 my-2">
                            <div className="col-span-1 font-semibold">
                              Ownership Percentage{" "}
                            </div>
                            <div className="col-span-1 text-gray-600 text-end">
                              {owner?.ownership_percentage}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 my-2">
                            <div className="col-span-1 font-semibold">
                              Location
                            </div>
                            <div className="col-span-1  break-all text-gray-600 text-end">
                              {owner?.city},{owner?.state},{owner?.country}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  }
                )}
              </Card>

              <Card className="my-4 p-2">
                <h2 className="text-lg text-gray-600 font-bold ">
                  Vendor Documents :-
                </h2>
                {vendorDetails?.vendordocumentsdata?.map(
                  (document: any, index: number) => {
                    return (
                      <div key={index} className="grid grid-cols-2 my-2">
                        <div className="col-span-1 font-semibold flex items-center">
                          {document?.document_type}
                        </div>
                        <div className="col-span-1 text-gray-600 text-end ">
                          <a href={document?.document_url} download>
                            <Button className="bg-blue-500">Download</Button>
                          </a>
                        </div>
                      </div>
                    );
                  }
                )}
              </Card>

              <Card className="my-4 p-2 flex items-center justify-between gap-2">
                <div className="text-lg text-gray-600 font-bold ">
                  Socials Links :-
                </div>
                <div className="flex gap-2 ">
                  <NavLink to={vendorDetails.website_url}>
                    <TiIconWebsite />
                  </NavLink>
                  <NavLink to={vendorDetails.instagram_url}>
                    <TiIconInstagram />
                  </NavLink>
                  <NavLink to={vendorDetails.facebook_url}>
                    <TiIconFacebook />
                  </NavLink>
                  <NavLink to={vendorDetails.linkedin_url}>
                    <TiIconLinkedin />
                  </NavLink>
                  <NavLink to={vendorDetails.youtube_url}>
                    <TiIconYoutube />
                  </NavLink>
                </div>
              </Card>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default VendorDetailsDrawer;
