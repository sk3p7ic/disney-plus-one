import { SearchQueryContextProvider } from "../contexts/SearchQueryContext";

export const SearchPage = () => {
  return (
    <main>
      <SearchQueryContextProvider>
        <div></div>
      </SearchQueryContextProvider>
    </main>
  );
};
