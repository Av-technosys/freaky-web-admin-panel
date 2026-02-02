import { useState } from "react";
import { useGetEventTypes } from "../../services/useGetEventTypes";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import EditEventTypeDialog from "../editEventTypeDialog";
import { DeleteEventTypeDialog } from "../deleteDialog";
import AddEventTypeDialog from "../addEventTypeDialog";

const EventTypes = () => {
  const { data: eventTypes, isPending } = useGetEventTypes();

  const [openEditEvntDialog, setOpenEditEvntDialog] = useState(false);
  const [openAddEvntTypeDialog, setOpenAddEvntTypeDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventTypeDetails, seteventTypeDetails] = useState();
  const [eventTypeId, setEventTypeId] = useState();

  const editHandler = (eventTypeDetails: any) => {
    setOpenEditEvntDialog(true);
    seteventTypeDetails(eventTypeDetails);
  };

  const deleteHandler = (eventTypeId: any) => {
    setEventTypeId(eventTypeId);
    setDeleteDialogOpen(true);
  };

  return (
    <>
      {
        <>
          <AddEventTypeDialog
            open={openAddEvntTypeDialog}
            setOpen={setOpenAddEvntTypeDialog}
          />
          <EditEventTypeDialog
            open={openEditEvntDialog}
            setOpen={setOpenEditEvntDialog}
            eventTypeDetails={eventTypeDetails}
          />

          <DeleteEventTypeDialog
            open={deleteDialogOpen}
            setOpen={setDeleteDialogOpen}
            eventTypeId={eventTypeId}
          />
        </>
      }
      <div className="flex items-center justify-end px-2 my-2 ">
        <Button
          onClick={() => setOpenAddEvntTypeDialog(true)}
          size="sm"
          variant="destructive"
          className="rounded-lg"
        >
          Add Event Type
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2 pr-2">
        {isPending && <div>Loading...</div>}
        {!isPending && eventTypes?.data?.length === 0 && (
          <div>
            <div className="text-center text-[#89868D] py-6">
              No event types found..
            </div>
          </div>
        )}
        {eventTypes?.data?.map((eventType: any, index: number) => {
          return (
            <>
              <Card
                key={index}
                className="group rounded-2xl border border-gray-200 bg-gray-50 shadow-none hover:shadow transition-all"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl overflow-hidden border bg-gray-100">
                      <img
                        src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${
                          eventType?.image
                        }`}
                        alt={eventType?.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {eventType?.name}
                      </h3>

                      <span className="text-xs text-gray-500">
                        Created on{" "}
                        {eventType?.createdAt &&
                          new Date(eventType.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <div className="mx-6 border-t" />

                <CardContent className="h-16 break-all overflow-y-auto">
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {eventType?.description}
                  </p>
                </CardContent>

                <CardFooter className="flex justify-end gap-3 pt-0">
                  <Button
                    onClick={() => editHandler(eventType)}
                    className="text-yellow-500 cursor-pointer border-yellow-500 px-1 shadow-none"
                    variant="link"
                  >
                    Edit
                  </Button>

                  <Button
                    onClick={() => deleteHandler(eventType.id)}
                    className="text-red-500 cursor-pointer border-red-500 px-1 shadow-none"
                    variant="link"
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            </>
          );
        })}
      </div>
    </>
  );
};

export default EventTypes;
