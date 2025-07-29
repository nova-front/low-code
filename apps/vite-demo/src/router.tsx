import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import EditorLayout from "./pages/editor/Layout";
import BasicEditor from "./pages/editor/BasicEditor";
import EPV from "./pages/editor/EPV";
import HomePage from "./pages/home";
import BaseUIPage from "./pages/base-ui";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/editor",
    element: (
      <Layout>
        <EditorLayout />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <BasicEditor />,
      },
      {
        path: "epv",
        element: <EPV />,
      },
    ],
  },

  {
    path: "/base-ui",
    element: (
      <Layout>
        <BaseUIPage />
      </Layout>
    ),
  },
]);
