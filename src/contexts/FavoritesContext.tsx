import React, { useContext, useState } from "react";

type FavoritesContextValue = {
  favorites: Set<number>;
  addFavorites: (characterId: number) => void;
};

const FavoritesContext = React.createContext<FavoritesContextValue>({
  favorites: new Set(),
  addFavorites: (_: number) => {},
});

export const useFavorites = () => useContext(FavoritesContext);

type FavoritesContextProviderProps = {
  children: React.ReactNode;
};

export const FavoritesContextProvider = ({
  children,
}: FavoritesContextProviderProps) => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const addFavorites = (characterId: number) => {
    const newFavorites = new Set(favorites);
    newFavorites.add(characterId);
    setFavorites(newFavorites);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
