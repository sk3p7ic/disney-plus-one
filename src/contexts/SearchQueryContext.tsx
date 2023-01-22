import React, { useContext, useEffect, useState } from "react";
import { ApolloError, DocumentNode, useQuery } from "@apollo/client";
import { getCharacterListQuery, type ShortCharacter } from "../util/queries";

type QueryDataResult = {
  characters: {
    items: ShortCharacter[];
    paginationInfo: {
      totalpages: number;
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
  incrPage: () => void;
  decrPage: () => void;
};

const SearchQueryContext = React.createContext<SearchQueryContextValue | null>(
  null
);

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

  const incrPage = () => setPage((page) => page + 1);
  const decrPage = () => setPage((page) => (page > 1 ? page - 1 : 1));

  return (
    <SearchQueryContext.Provider
      value={{
        searchQuery: { loading, error, data },
        page,
        incrPage,
        decrPage,
      }}
    >
      {children}
    </SearchQueryContext.Provider>
  );
};
