import { createBrowserRouter } from "react-router";
import EditorDemo from "./pages/editor";
import HomePage from "./pages/home";
import EpvPage from "./pages/epv";

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
]);
