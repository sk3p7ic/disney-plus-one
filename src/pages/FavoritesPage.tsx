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
import { ConfirmFavoriteRemoveDialog } from "../components/FavoritesPage/ConfirmFavoriteRemove";

export const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavorites();
  // Stores the information about a character that the user may want to remove
  const [potentiallyRemovedCharacter, setPotentiallyRemovedCharacter] =
    useState<FavoriteCharacterInfo | undefined>(undefined);
  // Stores whether or not to show the snackbar letting the user know a favorite was removed
  const [showSnackbar, setShowSnackbar] = useState(false);
  // Stores the text that is displayed inside the snackbar
  const [snackbarText, setSnackbarText] = useState("");
  // Stores whether or not to show the dialog enabling the user to confirm removing a favorite
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  /**
   * Handles if the user would like to potentially like to remove a character
   * from their favorites by showing a dialog that enables the user to confirm
   * this action.
   * @param character The character to attempt to remove.
   */
  const handleStartRemove = (character: FavoriteCharacterInfo) => {
    setPotentiallyRemovedCharacter(character);
    setShowConfirmationDialog(true);
  };
  const handleCloseDialog = () => setShowConfirmationDialog(false);
  const handleDialogAction = (
    action: "accept" | "decline",
    character: FavoriteCharacterInfo
  ) => {
    if (action === "accept") handleRemoveFavorite(character);
  };

  /**
   * Handles removing a given character from the user's list of favorites.
   * @param character The character to remove from the user's favorites.
   */
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
        {Array.from(favorites.keys()).length > 0 ? (
          <List sx={{ backgroundColor: "#f3e5f5", borderRadius: 2, margin: 2 }}>
            {Array.from(favorites.values()).map((character) => (
              <ListItem key={character.id}>
                <ListItemAvatar>
                  <Avatar src={character.imageUrl} />
                </ListItemAvatar>
                <ListItemText sx={{ flexGrow: 1 }}>
                  {character.name}
                </ListItemText>
                <ListItemButton
                  onClick={() => handleStartRemove(character)}
                  sx={{
                    flexGrow: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Favorite />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>You have not added any favorites yet.</Typography>
        )}
      </Container>
      <ConfirmFavoriteRemoveDialog
        show={showConfirmationDialog}
        onClose={handleCloseDialog}
        handleButtonClick={handleDialogAction}
        character={potentiallyRemovedCharacter}
      />
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarText}
      />
    </Container>
  );
};
