import React, { useContext, useEffect, useState } from "react";

export type FavoriteCharacterInfo = {
  id: number;
  name: string;
  imageUrl: string;
};

/** Data type for storing favorites. */
type FavoritesContextValue = {
  /** The map of user's favorite character IDs and their information. */
  favorites: Map<number, FavoriteCharacterInfo>;
  /**
   * Toggles whether a character is stored as a favorite or not. Updates
   * both local storage (cookies), as well as application state.
   * @param info The basic character info for this favorite character.
   */
  toggleFavorite: (info: FavoriteCharacterInfo) => void;
};

/** Stores and manages the list of a user's favorite characters. */
const FavoritesContext = React.createContext<FavoritesContextValue>({
  favorites: new Map(),
  toggleFavorite: (_: FavoriteCharacterInfo) => {},
});

/** Utility function to use this context without importing useContext in the child file. */
export const useFavorites = () => useContext(FavoritesContext);

type FavoritesContextProviderProps = {
  children: React.ReactNode;
};

export const FavoritesContextProvider = ({
  children,
}: FavoritesContextProviderProps) => {
  // Stores the Map of favorite characters by their ID, and handles updates to this state
  const [favorites, setFavorites] = useState<
    Map<number, FavoriteCharacterInfo>
  >(new Map());

  // Load the user's favorites from localStorage, if possible.
  useEffect(() => {
    const loadAndSetFavorites = async () => {
      // Get the favorites from localStorage
      const favs: { favs: FavoriteCharacterInfo[] } = await JSON.parse(
        localStorage.getItem("disney-lookup-favorites") ?? "{favs: []}"
      );
      // Convert the loaded data into a form that may be used to make a Map
      const loadedFavorites: [number, FavoriteCharacterInfo][] = favs.favs.map(
        (f) => [f.id, f]
      );
      // Set this list to be the new list of favorites
      setFavorites(new Map(loadedFavorites));
    };
    loadAndSetFavorites();
  }, []);

  const toggleFavorite = (info: FavoriteCharacterInfo) => {
    // Get the current list of favorites and clone into new Map
    // (required for updating state)
    const newFavorites = new Map(favorites);
    // Toggle the state of this character being in the map of favorites
    if (newFavorites.has(info.id)) newFavorites.delete(info.id);
    else newFavorites.set(info.id, info);
    // Add this new list to localStorage as a cookie
    localStorage.setItem(
      "disney-lookup-favorites",
      JSON.stringify({ favs: Array.from(newFavorites.values()) })
    );
    // Now update the state
    setFavorites(newFavorites);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
