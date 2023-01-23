import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { DefaultLayout } from "./pages/_Layout";
import { HomePage } from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";
import {
  CharacterPage,
  loader as characterPageLoader,
} from "./pages/CharacterPage";
import { FavoritesContextProvider } from "./contexts/FavoritesContext";

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
  {
    path: "/search/:character",
    element: toRouteElement(<CharacterPage />),
    loader: characterPageLoader,
  },
]);

export const App = () => {
  return (
    <FavoritesContextProvider>
      <RouterProvider router={router} />
    </FavoritesContextProvider>
  );
};
