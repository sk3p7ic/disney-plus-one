import { DocumentNode, gql, useQuery } from "@apollo/client";

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

export type ShortCharacter = {
  _id: number;
  url: string;
  name: string;
  sourceUrl: string;
  imageUrl: string;
  films: string[];
  tvShows: string[];
};

export const getCharacterListQuery = (page: number): DocumentNode =>
  gql`
    {
      characters (page: ${page}) {
        items {
          _id
          url
          name
          sourceUrl
          imageUrl
          films
          tvShows
        }
        paginationInfo {
          totalPages
        }
      }
    }
  `;
