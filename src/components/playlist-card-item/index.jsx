import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { PlayCircleOutline } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Button } from "@mui/material";
import { Link } from "react-router";
import { useStoreActions, useStoreState } from "easy-peasy";

const PlaylistCardItem = ({
  playlistId,
  playlistThumbnail,
  playlistTitle,
  channelTitle,
}) => {
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
      sx={{
        height: 400,
        width: 345,
        display: "flex",
        flexDirection: "column",
        margin: 1,
      }}
    >
      <CardMedia
        component="img"
        image={playlistThumbnail.url}
        alt={playlistTitle}
        sx={{ height: 200, objectFit: "cover" }}
      />

      <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            justifyItems: "space-between",
            alignItems: "self-start",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "text.primary",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: 60,
            }}
          >
            {playlistTitle}
          </Typography>
          <Button
            onClick={() =>
              isFavorite
                ? favoritesActions.removeFromFavorite(playlistId)
                : favoritesActions.addToFavorite(playlistId)
            }
            startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          />
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 30,
          }}
        >
          {channelTitle}
        </Typography>
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={`/player/${playlistId}`}>
          <Button
            onClick={() => recentActions.addToRecent(playlistId)}
            startIcon={<PlayCircleOutline />}
          >
            Start Tutorial
          </Button>
        </Link>

        <Button
          onClick={handleDeletePlaylist}
          startIcon={<DeleteOutlineIcon />}
        ></Button>
      </CardActions>
    </Card>
  );
};

export default PlaylistCardItem;
