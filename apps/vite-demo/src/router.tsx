import { createBrowserRouter } from "react-router";
import EditorDemo from "./pages/editor";
import HomePage from "./pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/editor",
    element: <EditorDemo />,
  },
]);
