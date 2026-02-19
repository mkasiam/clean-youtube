import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { PlayCircleOutline } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { Link } from "react-router";

const PlaylistCardItem = ({
  playlistId,
  playlistThumbnail,
  playlistTitle,
  channelTitle,
}) => {
  return (
    <Card
      sx={{
        height: "100%",
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        margin: 1,
      }}
    >
      <CardMedia
        component="img"
        image={playlistThumbnail.url}
        alt={playlistTitle}
      />
      <CardContent>
        <Typography variant="h6" sx={{ color: "text.primary" }}>
          {playlistTitle.length > 50
            ? `${playlistTitle.slice(0, 50)}...`
            : playlistTitle}
        </Typography>

        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          {channelTitle}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }}></Box>
      <CardActions disableSpacing>
        <Link to={`/player/${playlistId}`}>
          <Button startIcon={<PlayCircleOutline />}>Start Tutorial</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default PlaylistCardItem;
