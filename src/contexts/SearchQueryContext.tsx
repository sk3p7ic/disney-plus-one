import React, { useContext, useEffect, useState } from "react";
import { ApolloError, DocumentNode, useQuery } from "@apollo/client";
import { getCharacterListQuery, type ShortCharacter } from "../util/queries";

type QueryDataResult = {
  characters: {
    items: ShortCharacter[];
    paginationInfo: {
      totalPages: number;
    };
  };
};

type SearchQueryContextValue = {
  searchQuery: {
    loading: boolean;
    error?: ApolloError;
    data?: QueryDataResult;
  };
  page: number;
  changePage: (_: number) => void;
};

const SearchQueryContext = React.createContext<SearchQueryContextValue>({
  searchQuery: { loading: false },
  page: 1,
  changePage: (_: number) => {},
});

export const useSearchQuery = () => useContext(SearchQueryContext);

type SearchQueryContextProviderProps = {
  children: React.ReactNode;
};

export const SearchQueryContextProvider = ({
  children,
}: SearchQueryContextProviderProps) => {
  const [page, setPage] = useState(1);
  const [searchQueryString, setSearchQueryString] = useState<DocumentNode>(
    getCharacterListQuery(page)
  );

  useEffect(() => {
    setSearchQueryString(getCharacterListQuery(page));
  }, [page]);

  const { loading, error, data } = useQuery<QueryDataResult>(searchQueryString);

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
