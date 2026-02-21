import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { extractingPlaylistId } from "../utils/extracting-playlistId";

const PlaylistForm = ({ open, handleClose }) => {
  const [state, setState] = useState("");

  const getPlaylistData = useStoreActions(
    (actions) => actions.playlists.getPlaylistData,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    let playlistId = state;
    if (state.match(/youtube.com(.*)/)) {
      playlistId = extractingPlaylistId(state);
    }

    if (!playlistId) {
      alert("Invalid Youtube Playlist Link");
    } else {
      await getPlaylistData(playlistId);
      setState(" ");
      handleClose();
    }
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
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Add Playlist
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PlaylistForm;
