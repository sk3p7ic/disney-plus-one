import React, { useContext, useState } from "react";

type FavoritesContextValue = {
  favorites: Set<number>;
  toggleFavorite: (characterId: number) => void;
};

const FavoritesContext = React.createContext<FavoritesContextValue>({
  favorites: new Set(),
  toggleFavorite: (_: number) => {},
});

export const useFavorites = () => useContext(FavoritesContext);

type FavoritesContextProviderProps = {
  children: React.ReactNode;
};

export const FavoritesContextProvider = ({
  children,
}: FavoritesContextProviderProps) => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (characterId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(characterId)) newFavorites.delete(characterId);
    else newFavorites.add(characterId);
    setFavorites(newFavorites);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
