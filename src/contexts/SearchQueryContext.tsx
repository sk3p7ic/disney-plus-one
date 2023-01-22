import React, { useContext, useEffect, useState } from "react";
import { ApolloError, DocumentNode, useQuery } from "@apollo/client";
import { getCharacterListQuery, type ShortCharacter } from "../util/queries";

/** Data type for results of a query for all characters. */
type QueryDataResult = {
  characters: {
    items: ShortCharacter[];
    paginationInfo: {
      totalPages: number;
    };
  };
};

/** Define the data that will be available via this context. */
type SearchQueryContextValue = {
  searchQuery: {
    loading: boolean;
    error?: ApolloError;
    data?: QueryDataResult;
  };
  page: number;
  changePage: (_: number) => void;
};

// Create the context
const SearchQueryContext = React.createContext<SearchQueryContextValue>({
  searchQuery: { loading: false },
  page: 1,
  changePage: (_: number) => {},
});

// Utility function to use this context without importing useContext in the child file
export const useSearchQuery = () => useContext(SearchQueryContext);

/** Define the props for this context's provider. */
type SearchQueryContextProviderProps = {
  children: React.ReactNode;
};

/** Used to more easily manage state for the current search. */
export const SearchQueryContextProvider = ({
  children,
}: SearchQueryContextProviderProps) => {
  // Stores the current page
  const [page, setPage] = useState(1);
  // Stores the current query string
  const [searchQueryString, setSearchQueryString] = useState<DocumentNode>(
    getCharacterListQuery(page)
  );

  useEffect(() => {
    // Change the query string when the page changes
    setSearchQueryString(getCharacterListQuery(page));
  }, [page]);

  // Perform the query
  const { loading, error, data } = useQuery<QueryDataResult>(searchQueryString);

  /**
   * Handles changing the currently-displayed page to the user.
   * @param p The new page number to change to.
   */
  const changePage = (p: number) => setPage(p);

  return (
    <SearchQueryContext.Provider
      value={{
        searchQuery: { loading, error, data },
        page,
        changePage,
      }}
    >
      {children}
    </SearchQueryContext.Provider>
  );
};
