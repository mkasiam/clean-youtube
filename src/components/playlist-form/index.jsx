import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { extractYoutubePlaylistId } from "../utils/extract-youtube-playlistId";
import { CircularProgress, Snackbar, Alert, Typography } from "@mui/material";

const PlaylistForm = ({ open, handleClose }) => {
  const [state, setState] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { getPlaylistData, setError } = useStoreActions(
    (actions) => actions.playlists,
  );
  const { error, isLoading } = useStoreState((state) => state.playlists);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let playlistId = state;
    if (state.match(/youtube.com(.*)/)) {
      playlistId = extractYoutubePlaylistId(state);
    }

    if (!playlistId) {
      setError("Invalid Youtube Playlist Link");
      setOpenSnackbar(true);
      return;
    }

    try {
      await getPlaylistData(playlistId);
      setState("");
      setOpenSnackbar(true);
      setSuccessMessage("Data Fetched Successfully.");
      handleClose();
    } catch {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSuccessMessage("");
    setError("");
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Playlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new playlist please insert correct playlistId or Link.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              label="Playlist ID or Link Includes Playlist"
              fullWidth
              variant="standard"
              onChange={(e) => setState(e.target.value)}
              disabled={isLoading}
            />
          </form>
          {isLoading && <CircularProgress />}
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" form="subscription-form" disabled={isLoading}>
            Add Playlist
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={successMessage ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {successMessage || error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PlaylistForm;
