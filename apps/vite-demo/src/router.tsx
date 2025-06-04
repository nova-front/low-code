import { createBrowserRouter } from "react-router";
import EditorDemo from "./pages/editor";
import HomePage from "./pages/home";
import EpvPage from "./pages/epv";
import BaseUIPage from "./pages/base-ui";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/editor",
    element: <EditorDemo />,
  },
  {
    path: "/epv",
    element: <EpvPage />,
  },
  {
    path: "/base-ui",
    element: <BaseUIPage />,
  },
]);
