import AppLayout from "@/components/app-layout";
import Chat from "@/pages/chat";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import MedicalHistory from "@/pages/medical-history";
import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./route-guards";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "medical-history", element: <MedicalHistory /> },
          { path: "chat", element: <Chat /> },
          { path: "profile", element: <div>Profile</div> },
        ],
      },
    ],
  },
]);
