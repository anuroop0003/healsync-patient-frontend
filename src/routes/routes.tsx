import AppLayout from "@/components/app-layout";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import MedicalHistory from "@/pages/medical-history";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "medical-history",
        element: <MedicalHistory />,
      },
      {
        path: "chat",
        element: <div>AI Chat</div>,
      },
      {
        path: "profile",
        element: <div>Profile</div>,
      },
    ],
  },
]);
