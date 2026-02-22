import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { PlayCircleOutline } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import { Link } from "react-router";
import { useStoreActions, useStoreState } from "easy-peasy";

const PlaylistCardItem = ({
  playlistId,
  playlistThumbnail,
  playlistTitle,
  channelTitle,
}) => {
  const addToRecent = useStoreActions((actions) => actions.recents.addToRecent);
  const favoritesActions = useStoreActions((actions) => actions.favorites);
  const favorites = useStoreState((state) => state.favorites.items);

  const isFavorite = favorites.includes(playlistId);

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

        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            fontSize: "14px",
            fontWeight: "500",
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
            onClick={() => addToRecent(playlistId)}
            startIcon={<PlayCircleOutline />}
          >
            Start Tutorial
          </Button>
        </Link>

        <Button
          onClick={() =>
            isFavorite
              ? favoritesActions.removeFromFavorite(playlistId)
              : favoritesActions.addToFavorite(playlistId)
          }
          startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        ></Button>
      </CardActions>
    </Card>
  );
};

export default PlaylistCardItem;
