import { gql, useQuery } from "@apollo/client";

export type TotalPageData = {
  characters: {
    paginationInfo: {
      totalPages: number;
    };
  };
};

export const getTotalPages = () =>
  useQuery<TotalPageData>(gql`
    {
      characters {
        paginationInfo {
          totalPages
        }
      }
    }
  `);

export type LastPageItemCountData = {
  characters: {
    paginationInfo: {
      pageItemCount: number;
    };
  };
};

export const getLastPageItemCount = (page: number) =>
  useQuery<LastPageItemCountData>(
    gql`
      {
        characters(page: ${page}) {
          paginationInfo {
            pageItemCount
          }
        }
      }
    `
  );
