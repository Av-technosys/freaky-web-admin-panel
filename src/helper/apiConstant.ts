export const apiConstant = {
  vendor: {
    getAllVendors: "/v1/admin/vendors_for_adminpanel",
    updateVendorStatus: "/v1/admin/update_status",
  },
  user: {
    getAllUsers: "/v1/admin/users",
    getUserInfo: "/v1/admin/user_details",
  },
  event: {
    getAllEventTypes: "/v1/admin/event_type",
    createEventType: "/v1/admin/event_type",
    updateEventType: "/v1/admin/event_type",
    deleteEventType: "/v1/admin/event_type",
  },
  uploadImage: {
    getS3Url: "/v1/upload/get_S3_url",
  },
};
