import { axiosInstance } from "./api";
import { apiConstant } from "./apiConstant";

export const getAllEventTypes = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.event.getAllEventTypes}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const createEventTypeHandler = async (eventTypeDetails: any) => {
  try {
    const response = await axiosInstance.post(
      `${apiConstant.event.createEventType}`,
      eventTypeDetails
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const updateEventTypeHandler = async ({ data, eventTypeId }: any) => {
  try {
    const response = await axiosInstance.put(
      `${apiConstant.event.updateEventType}/${eventTypeId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const deleteEventTypeHandler = async (eventTypeId: any) => {
  try {
    const response = await axiosInstance.delete(
      `${apiConstant.event.deleteEventType}/${eventTypeId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};
