import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/home.tsx";
import App from "./App.tsx";
import Payments from "./components/pages/payments.tsx";
import ContactUs from "./components/pages/contactUs.tsx";
import Vendors from "./components/pages/vendors.tsx";
import Users from "./components/pages/users.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import VendorRequests from "./components/pages/vendorRequests.tsx";

import EventTypes from "./components/pages/eventTypes.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import Login from "./components/pages/login.tsx";
import ProtectRoute from "./components/protectRoute.tsx";
import Reviews from "./components/pages/reviews.tsx";
import ProductTypes from "./components/pages/productTypes.tsx";
import FeaturedBanner from "./components/pages/featuredBanner.tsx";
import VendorRejected from "./components/pages/vendorRejected.tsx";
import FeaturedCategory from "./components/pages/featuredCategory.tsx";
import FeaturedProduct from "./components/pages/featuredProduct.tsx";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <ProtectRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/payments",
            element: <Payments />,
          },
          {
            path: "/contact-us",
            element: <ContactUs />,
          },
          {
            path: "/vendors",
            element: <Vendors />,
          },
          {
            path: "/vendor-requests",
            element: <VendorRequests />,
          },
          {
            path: "/vendor-rejected",
            element: <VendorRejected />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/event-types",
            element: <EventTypes />,
          },
          {
            path: "/featured_banner",
            element: <FeaturedBanner />,
          },
          {
            path: "/featured_category",
            element: <FeaturedCategory />,
          },
          {
            path: "/featured_product",
            element: <FeaturedProduct />,
          },
          {
            path: "/product-types",
            element: <ProductTypes />,
          },
          {
            path: "/reviews",
            element: <Reviews />,
          },
        ],
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <Toaster position="top-center" />
    </QueryClientProvider>
  </StrictMode>,
);
