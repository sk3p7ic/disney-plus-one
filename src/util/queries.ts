import { DocumentNode, gql, useQuery } from "@apollo/client";

export type TotalPageData = {
  characters: {
    paginationInfo: {
      totalPages: number;
    };
  };
};

/**
 * Queries and returns the state for the query of the total number of pages of
 * characters.
 * @returns Query results for the total number of pages.
 */
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

/**
 * Queries and returns the state for the query of the number of items present
 * on the last page of characters.
 * @param page The page number of the last page of characters.
 * @returns Query results for the number of items on the last page.
 */
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

/**
 * Gets the list of characters available under a given page.
 * @param page The page to retrieve the list of characters for>
 * @returns Query results for the Disney characters.
 */
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

export type LongCharacter = {
  _id: number;
  name: string;
  sourceUrl: string;
  imageUrl: string;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  alignment?: string;
  parkAttractions: string[];
  allies: string[];
  enemies: string[];
};

export const getCharacterById = (id: number): DocumentNode => gql`
  {
    character (_id: ${id}) {
      _id
      name
      sourceUrl
      imageUrl
      films
      shortFilms
      tvShows
      alignment
      parkAttractions
      allies
      enemies
    }
  }
`;

export const getCharacterByName = (name: string): DocumentNode => gql`
  {
    characterByName (name: \"${name}\") {
      _id
      name
      sourceUrl
      imageUrl
      films
      shortFilms
      tvShows
      alignment
      parkAttractions
      allies
      enemies
    }
  }
`;
