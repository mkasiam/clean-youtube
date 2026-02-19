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
            minHeight: 60
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
            fontSize:"14px",
            fontWeight:"500",
            overflow: "hidden",
            minHeight: 30
          }}
        >
          {channelTitle}
        </Typography>
      </CardContent>
      <CardActions disableSpacing >
        <Link to={`/player/${playlistId}`}>
          <Button startIcon={<PlayCircleOutline />}>Start Tutorial</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default PlaylistCardItem;
