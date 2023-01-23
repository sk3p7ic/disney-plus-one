import {
  Avatar,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import {
  FavoriteCharacterInfo,
  useFavorites,
} from "../contexts/FavoritesContext";
import { useState } from "react";

export const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  const handleRemoveFavorite = (character: FavoriteCharacterInfo) => {
    toggleFavorite(character);
    setSnackbarText(`Removed favorite '${character.name}'.`);
    setShowSnackbar(true);
  };

  return (
    <Container maxWidth="md" sx={{ paddingY: 2 }}>
      <Typography variant="h4">My Favorites.</Typography>
      <Divider />
      <Container maxWidth="sm">
        <List sx={{ backgroundColor: "#f3e5f5", borderRadius: 2, margin: 2 }}>
          {Array.from(favorites.values()).map((character) => (
            <ListItem key={character.id}>
              <ListItemAvatar>
                <Avatar src={character.imageUrl} />
              </ListItemAvatar>
              <ListItemText sx={{ flexGrow: 1 }}>{character.name}</ListItemText>
              <ListItemButton
                onClick={() => handleRemoveFavorite(character)}
                sx={{ flexGrow: 0, display: "flex", justifyContent: "center" }}
              >
                <Favorite />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Container>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarText}
      />
    </Container>
  );
};
