import { Link } from "react-router-dom";
import { TiIconWebsite, TiIconX } from "./icons";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useGetVendorDetails } from "../services/useGetVendors";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Label } from "./ui/label";

const VendorDetailsDrawer = ({ open, setOpen, vendorId }: any) => {
  const [vendorDetails, setVendorDetails] = useState<any>({});

  const { data: vendorData, isPending } = useGetVendorDetails(vendorId);

  useEffect(() => {
    setVendorDetails(vendorData?.data);
  }, [vendorData, vendorId]);

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent>
          <div className=" w-full h-full bg-gray-50 overflow-y-scroll">
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
            {isPending && <div>Loading...</div>}
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
              <Accordion
                type="single"
                collapsible
                defaultValue="business"
                className="max-w-lg"
              >
                <AccordionItem value="business">
                  <AccordionTrigger>Business Information</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 my-2 gap-2">
                        <div className="col-span-1 flex flex-col text-gray-600">
                          <Label className="text-xs">Business Type</Label>
                          <p className="text-gray-700 text-[15px] ">
                            {vendorDetails?.business_type}
                          </p>
                        </div>

                        <div className="col-span-1 flex flex-col text-gray-600">
                          <Label className="text-xs">DBA Name</Label>
                          <p className="text-gray-700 text-[15px] ">
                            {vendorDetails?.dba_name}
                          </p>
                        </div>

                        <div className="col-span-1 flex flex-col text-gray-600">
                          <Label className="text-xs">EIN Number</Label>
                          <p className="text-gray-700 text-[15px] ">
                            {vendorDetails?.ein_number}
                          </p>
                        </div>

                        <div className="col-span-1 flex flex-col text-gray-600">
                          <Label className="text-xs">Legal Entity Name</Label>
                          <p className="text-gray-700 text-[15px] ">
                            {vendorDetails?.legal_entity_name}
                          </p>
                        </div>

                        <div className="col-span-1 flex flex-col text-gray-600">
                          <Label className="text-xs">Incorporation Date</Label>
                          <p className="text-gray-700 text-[15px] ">
                            {vendorDetails?.incorporation_date &&
                              new Date(
                                vendorDetails.incorporation_date,
                              ).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="personal">
                  <AccordionTrigger>Personal Details</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 my-2 gap-2">
                        <div className="col-span-1 flex flex-col text-gray-600">
                          <Label className="text-xs">Contact Name</Label>
                          <p className="text-gray-700 text-[15px] ">
                            {vendorDetails?.primary_contact_name}
                          </p>
                        </div>

                        <div className="col-span-1 flex flex-col text-gray-600">
                          <Label className="text-xs">Email</Label>
                          <p className="text-blue-500 ">
                            <Link
                              to={`mailto:${vendorDetails?.primary_contact_email}`}
                            >
                              {vendorDetails?.primary_contact_email}
                            </Link>
                          </p>
                        </div>

                        <div className="col-span-1 flex flex-col text-gray-600">
                          <Label className="text-xs">Phone Number</Label>
                          <p className="text-gray-700 text-[15px] ">
                            {vendorDetails?.primary_phone_number}
                          </p>
                        </div>

                        <div className="col-span-1 flex flex-col text-gray-600">
                          <Label className="text-xs">Address 1</Label>
                          <p className="text-gray-700 text-[15px] ">
                            {vendorDetails?.street_address_line1}
                          </p>
                        </div>

                        <div className="col-span-1 flex flex-col text-gray-600">
                          <Label className="text-xs">Address 2</Label>
                          <p className="text-gray-700 text-[15px] ">
                            {vendorDetails?.street_address_line2}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="bank">
                  <AccordionTrigger>Bank Details</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 my-2 gap-2">
                        <div className="col-span-1 flex flex-col text-gray-600">
                          <Label className="text-xs">Bank Name</Label>
                          <p className="text-gray-700 text-[15px] ">
                            {vendorDetails?.bank_name}
                          </p>
                        </div>

                        <div className="col-span-1 flex flex-col text-gray-600">
                          <Label className="text-xs">Account Number</Label>
                          <p className="text-gray-700 text-[15px] ">
                            {vendorDetails?.bank_account_number}
                          </p>
                        </div>

                        <div className="col-span-1 flex flex-col text-gray-600">
                          <Label className="text-xs">Bank Type</Label>
                          <p className="text-gray-700 text-[15px] ">
                            {vendorDetails?.bank_type}
                          </p>
                        </div>

                        <div className="col-span-1 flex flex-col text-gray-600">
                          <Label className="text-xs">Payee Name</Label>
                          <p className="text-gray-700 text-[15px] ">
                            {vendorDetails?.payee_name}
                          </p>
                        </div>

                        <div className="col-span-1 flex flex-col text-gray-600">
                          <Label className="text-xs">Routing Number</Label>
                          <p className="text-gray-700 text-[15px] ">
                            {vendorDetails?.routing_number}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ownership">
                  <AccordionTrigger>Ownership Details</AccordionTrigger>
                  <AccordionContent>
                    {vendorDetails?.ownershipdetails?.map(
                      (owner: any, index: number) => (
                        <div key={index} className="mb-4">
                          <h3 className="font-semibold text-gray-700 text-[15px] mb-2">
                            Owner {index + 1}
                          </h3>

                          <div className="space-y-2">
                            <div className="grid grid-cols-1 my-2 gap-2">
                              <div className="col-span-1 flex flex-col text-gray-600">
                                <Label className="text-xs">Name</Label>
                                <p className="text-gray-700 text-[15px] ">
                                  {owner.first_name} {owner.last_name}
                                </p>
                              </div>

                              <div className="col-span-1 flex flex-col text-gray-600">
                                <Label className="text-xs">SSN Number</Label>
                                <p className="text-gray-700 text-[15px] ">
                                  {owner.ssn_number}
                                </p>
                              </div>

                              <div className="col-span-1 flex flex-col text-gray-600">
                                <Label className="text-xs">Ownership %</Label>
                                <p className="text-gray-700 text-[15px] ">
                                  {owner.ownership_percentage}
                                </p>
                              </div>

                              <div className="col-span-1 flex flex-col text-gray-600">
                                <Label className="text-xs">Location</Label>
                                <p className="text-gray-700 text-[15px] ">
                                  {owner.city}, {owner.state}, {owner.country}
                                </p>
                              </div>
                            </div>
                          </div>

                          <Separator className="my-3" />
                        </div>
                      ),
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="documents">
                  <AccordionTrigger>Vendor Documents</AccordionTrigger>

                  <AccordionContent>
                    {vendorDetails?.vendordocumentsdata?.map(
                      (document: any, index: number) => (
                        <div key={index} className="mb-4">
                          <div className="grid grid-cols-1 my-2 gap-2">
                            <div className="col-span-1 flex flex-col text-gray-600">
                              <Label className="text-xs">Document Type</Label>
                              <p className="text-gray-700 text-[15px]  break-all">
                                {document?.document_type}
                              </p>
                            </div>

                            <div className="col-span-1 flex items-center gap-1 text-gray-600">
                              <div className="col-span-1 text-gray-600 text-end ">
                                <a
                                  target="_blank"
                                  href={`${import.meta.env.VITE_IMAGE_BASE_URL}/${
                                    document?.document_url
                                  }`}
                                >
                                  <Button
                                    variant={"outline"}
                                    className=" text-blue-500 px-0 py-0 shadow-none border-none"
                                  >
                                    Download File <Download />
                                  </Button>
                                </a>
                              </div>
                            </div>
                          </div>

                          <Separator className="my-3" />
                        </div>
                      ),
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="socials">
                  <AccordionTrigger>Social Links</AccordionTrigger>

                  <AccordionContent>
                    <div className="grid grid-cols-1 my-2 gap-2">
                      <div className="col-span-1 flex flex-col text-gray-600">
                        <Label className="text-xs">Website</Label>
                        <p className="text-blue-500 flex gap-1 ">
                          <TiIconWebsite />
                          <Link to={`mailto:${vendorDetails?.website_url}`}>
                            {vendorDetails?.website_url}
                          </Link>
                        </p>
                      </div>

                      <div className="col-span-1 flex flex-col text-gray-600">
                        <Label className="text-xs">Instagram</Label>
                        <p className="text-blue-500 flex gap-1 ">
                          <TiIconWebsite />
                          <Link to={`mailto:${vendorDetails?.instagram_url}`}>
                            {vendorDetails?.instagram_url}
                          </Link>
                        </p>
                      </div>

                      <div className="col-span-1 flex flex-col text-gray-600">
                        <Label className="text-xs">Facebook</Label>
                        <p className="text-blue-500 flex gap-1 ">
                          <TiIconWebsite />
                          <Link to={`mailto:${vendorDetails?.facebook_url}`}>
                            {vendorDetails?.facebook_url}
                          </Link>
                        </p>
                      </div>

                      <div className="col-span-1 flex flex-col text-gray-600">
                        <Label className="text-xs">LinkedIn</Label>
                        <p className="text-blue-500 flex gap-1 ">
                          <TiIconWebsite />
                          <Link to={`mailto:${vendorDetails?.linkedin_url}`}>
                            {vendorDetails?.linkedin_url}
                          </Link>
                        </p>{" "}
                      </div>

                      <div className="col-span-1 flex flex-col text-gray-600">
                        <Label className="text-xs">YouTube</Label>
                        <p className="text-blue-500 flex gap-1 ">
                          <TiIconWebsite />
                          <Link to={`mailto:${vendorDetails?.instagram_url}`}>
                            {vendorDetails?.youtube_url}
                          </Link>
                        </p>
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

export default VendorDetailsDrawer;
