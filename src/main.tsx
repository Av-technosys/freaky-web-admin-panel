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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
