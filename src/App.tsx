import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { DefaultLayout } from "./pages/_Layout";
import { HomePage } from "./pages/HomePage";

export const App = () => {
  return (
    <DefaultLayout>
      <HomePage />
    </DefaultLayout>
  );
};
