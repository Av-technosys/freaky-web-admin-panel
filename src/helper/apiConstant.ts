export const apiConstant = {
  authentication: {
    login: "v1/auth/signin",
    forgetPasswordUsingEmail: "v1/auth/forgot-password",
    forgetPasswordUsingOTP: "v1/auth/confirm-forgot-password",
  },
  vendor: {
    getAllRequestedVendors: "/v1/admin/requested_vendors",
    getAllRejectedVendors: "/v1/admin/rejected_vendors",
    getAllVendors: "/v1/admin/vendors",
    getVendorInfo: "/v1/admin/vendor_details",
    updateVendorStatus: "/v1/admin/update_status",
    getAllServices: "/v1/vendor/product/meta",
  },
  user: {
    getAllUsers: "/v1/admin/users",
    getUserInfo: "/v1/admin/user_details",
    getUserDetails: "/v1/user/personal_details",
    updateUserDetails: "/v1/user/update_details",
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
    createFeaturedBanner: "/v1/admin/banner",
    deleteFeaturedBanner: "/v1/admin/banner",
  },
  featuredCategory: {
    getAllFeaturedCategory: "/v1/admin/category",
    updateFeaturedCategory: "/v1/admin/category",
    createFeaturedCategory: "/v1/admin/category",
    deleteFeaturedCategory: "/v1/admin/category",
  },
  featuredProduct: {
    getAllFeaturedProducts: "/v1/admin/featured_products",
    updateFeaturedProduct: "/v1/admin/featured_product",
    createFeaturedProduct: "/v1/admin/featured_product",
    deleteFeaturedProduct: "/v1/admin/featured_product",
  },
  pricingSetting: {
    getPricingSetting: "/v1/admin/pricing_setting",
    updatePricingSetting: "/v1/admin/pricing_setting",
    createPricingSetting: "/v1/admin/pricing_setting",
    deletePricingSetting: "/v1/admin/pricing_setting",
  },
};
