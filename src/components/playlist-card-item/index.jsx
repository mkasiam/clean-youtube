import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
  Avatar,
  IconButton
} from "@mui/material";
import { Link } from "react-router";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";

const PlaylistCardItem = ({
  playlistId,
  playlistThumbnail,
  playlistTitle,
  channelTitle,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Actions
  const recentActions = useStoreActions((actions) => actions.recents);
  const favoritesActions = useStoreActions((actions) => actions.favorites);
  const playlistActions = useStoreActions((actions) => actions.playlists);

  const favorites = useStoreState((state) => state.favorites.items);
  const isFavorite = favorites.includes(playlistId);

  const handleDeletePlaylist = () => {
    playlistActions.removePlaylist(playlistId);
    favoritesActions.removeFromFavorite(playlistId);
    recentActions.removeFromRecent(playlistId);
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: "flex",
        flexDirection: "column",
        bgcolor: 'transparent',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          '& .MuiCardMedia-root': {
            borderRadius: 0,
          }
        }
      }}
    >
      <Link to={`/player/${playlistId}`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => recentActions.addToRecent(playlistId)}>
        <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 3, transition: 'border-radius 0.2s' }}>
          <CardMedia
            component="img"
            image={playlistThumbnail.url}
            alt={playlistTitle}
            sx={{ 
              aspectRatio: '16/9',
              objectFit: "cover",
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.05)' }
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, px: 0, pt: 1.5 }}>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Avatar sx={{ bgcolor: 'action.hover', width: 36, height: 36 }}>
              {channelTitle?.charAt(0)}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mb: 0.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {playlistTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {channelTitle}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Link>

      <CardActions sx={{ px: 0, pt: 0, justifyContent: 'flex-end', gap: 1 }}>
        <IconButton
          size="small"
          onClick={() =>
            isFavorite
              ? favoritesActions.removeFromFavorite(playlistId)
              : favoritesActions.addToFavorite(playlistId)
          }
          sx={{ color: isFavorite ? 'primary.main' : 'inherit' }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        
        <IconButton
          size="small"
          onClick={() => setDialogOpen(true)}
          sx={{ '&:hover': { color: 'error.main' } }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </CardActions>

      {/* Dialog Model For delete  */}
      <Dialog
        fullScreen={fullScreen}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        PaperProps={{
          sx: { borderRadius: 4, p: 1 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          Delete Playlist?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will remove the playlist from your collection. This action cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ pb: 2, px: 3 }}>
          <Button onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeletePlaylist} 
            variant="contained" 
            color="error"
            sx={{ borderRadius: 50 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default PlaylistCardItem;
