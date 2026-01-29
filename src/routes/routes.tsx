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
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "medical-history",
    element: <MedicalHistory />,
  },
]);
