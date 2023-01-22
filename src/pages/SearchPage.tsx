import Container from "@mui/material/Container";
import { SearchNavigator } from "../components/SearchPage/SearchNavigator";
import { SearchResultsList } from "../components/SearchPage/SearchResultsList";
import { SearchQueryContextProvider } from "../contexts/SearchQueryContext";

export const SearchPage = () => {
  return (
    <main
      style={{
        flexGrow: 1,
        display: "flex",
      }}
    >
      <SearchQueryContextProvider>
        <Container maxWidth="lg">
          <SearchNavigator />
          <SearchResultsList />
          <SearchNavigator />
        </Container>
      </SearchQueryContextProvider>
    </main>
  );
};
