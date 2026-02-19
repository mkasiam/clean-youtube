import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

const PlaylistForm = ({ open, handleClose, getPlaylistId }) => {
  const [state, setState] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO: handle url later
    if (!state) {
      alert("Invalid State");
    } else {
      getPlaylistId(state);
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
              label="Playlist ID or Link"
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
