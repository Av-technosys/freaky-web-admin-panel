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

import EventTypes from "./components/pages/eventTypes.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path: "/users",
        element: <Users />,
      },
      {
        path: "/event-types",
        element: <EventTypes />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <Toaster position="top-center" />
    </QueryClientProvider>
  </StrictMode>
);
