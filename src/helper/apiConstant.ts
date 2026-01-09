export const apiConstant = {
  authentication: {
    login: "v1/auth/signin",
  },
  vendor: {
    getAllRequestedVendors: "/v1/admin/requested_vendors",
    getAllVendors: "/v1/admin/vendors",
    getVendorInfo: "/v1/admin/vendor_details",
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
  reviews: {
    getAllUserReviews: "/v1/admin/reviews",
    getReviewById: "/v1/vendor/review",
    deleteReviewById: "/v1/admin/review",
  },
  product: {
    getAllProductTypes: "/v1/admin/product_types",
    createProductType: "/v1/admin/product_type",
    updateProductType: "/v1/admin/product_type",
    deleteProductType: "/v1/admin/product_type",
  },
  featuredBanner: {
    getAllFeaturedBanners: "/v1/admin/banner",
    updateFeaturedBanner: "/v1/admin/banner",
  },
};
