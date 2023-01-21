import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { DefaultLayout } from "./pages/_Layout";
import { HomePage } from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";

const toRouteElement = (children: JSX.Element) => (
  <DefaultLayout>{children}</DefaultLayout>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: toRouteElement(<HomePage />),
  },
  {
    path: "/search",
    element: toRouteElement(<SearchPage />),
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
