import React, { useContext, useEffect, useState } from "react";

/** Data type for storing favorites. */
type FavoritesContextValue = {
  /** The set of user's favorite character IDs. */
  favorites: Set<number>;
  /**
   * Toggles the favorite state of a charcter by adding it if it is not
   * currently in the favorites, else removing it.
   * @param characterId The ID of this character to toggle favorite state of.
   */
  toggleFavorite: (characterId: number) => void;
};

/** Stores and manages the list of a user's favorite characters. */
const FavoritesContext = React.createContext<FavoritesContextValue>({
  favorites: new Set(),
  toggleFavorite: (_: number) => {},
});

/** Utility function to use this context without importing useContext in the child file. */
export const useFavorites = () => useContext(FavoritesContext);

type FavoritesContextProviderProps = {
  children: React.ReactNode;
};

export const FavoritesContextProvider = ({
  children,
}: FavoritesContextProviderProps) => {
  // Stores the Set of favorite characters by their ID, and handles updates to this state
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Load the user's favorites from localStorage, if possible.
  useEffect(() => {
    const loadAndSetFavorites = async () => {
      // Get the favorites from localStorage
      const favs: { favs: number[] } = await JSON.parse(
        localStorage.getItem("disney-lookup-favorites") ?? "{favs: []}"
      );
      // Set this list to be the new list of favorites
      setFavorites(new Set(favs.favs));
    };
    loadAndSetFavorites();
  }, []);

  const toggleFavorite = (characterId: number) => {
    // Get the current list of favorites and clone into new Set
    // (required for updating state)
    const newFavorites = new Set(favorites);
    // Toggle the state of this character being in the set of favorites
    if (newFavorites.has(characterId)) newFavorites.delete(characterId);
    else newFavorites.add(characterId);
    // Add this new list to localStorage as a cookie
    localStorage.setItem(
      "disney-lookup-favorites",
      JSON.stringify({ favs: Array.from(newFavorites) })
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
