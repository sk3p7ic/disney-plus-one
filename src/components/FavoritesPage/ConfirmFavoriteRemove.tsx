import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FavoriteCharacterInfo } from "../../contexts/FavoritesContext";

type ConfirmFavoriteRemoveDialogProps = {
  /** State of whether or not to show this dialog. */
  show: boolean;
  /** Function to handle closing this dialog. */
  onClose: () => void;
  /**
   * Handles the button clicks of either removing a character from the user's
   * favorites or canceling the action.
   * @param action Whether the user will choose to `accept` or `decline` the
   * option to remove this character from their favorites.
   */
  handleButtonClick: (
    action: "accept" | "decline",
    character: FavoriteCharacterInfo
  ) => void;
  /** The name of this character to remove. */
  character: FavoriteCharacterInfo;
};

export const ConfirmFavoriteRemoveDialog = ({
  show,
  onClose,
  handleButtonClick,
  character,
}: ConfirmFavoriteRemoveDialogProps) => {
  const handleClick = (action: "accept" | "decline") => {
    handleButtonClick(action, character);
    onClose();
  };

  return (
    <Dialog
      open={show}
      onClose={onClose}
      aria-labelledby="confirm-remove-title"
      aria-describedby="confirm-remove-description"
    >
      <DialogTitle id="confirm-remove-title">
        Remove this character from favorites?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-remove-description">
          Are you sure that you'd like to remove character "{character.name}"
          from your favorites?
        </DialogContentText>
        <DialogActions>
          <Button onClick={() => handleClick("decline")}>Cancel</Button>
          <Button onClick={() => handleClick("accept")} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
