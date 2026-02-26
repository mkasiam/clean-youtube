import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";

const PlaylistItems = ({
  item,
  index,
  currentPlaylistId,
  getVideoIndex,
  channelTitle,
  compact = false,
  active = false,
}) => {
  return (
    <Grid item xs={12}>
      <Link
        onClick={() => {
          getVideoIndex(index);
        }}
        to={`/player/${currentPlaylistId}/${item.videoId}`}
        component={RouterLink}
        sx={{ textDecoration: "none" }}
      >
        <Card
          sx={{
            display: "flex",
            alignItems: "flex-start",
            p: 1,
            gap: 1,
            border: "1px solid",
            borderColor: active ? "primary.main" : "divider",
            bgcolor: active ? "action.selected" : "background.paper",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <Chip label={index + 1} size="small" sx={{ mt: compact ? 0.5 : 4 }} />
          <CardMedia
            component="img"
            image={item.thumbnail.url}
            alt={item.title}
            sx={{
              width: compact ? { xs: 140, lg: 160 } : 200,
              height: compact ? { xs: 78, lg: 90 } : 112,
              objectFit: "cover",
              flexShrink: 0,
              borderRadius: 1,
            }}
          />
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
              minWidth: 0,
              p: "0 !important",
            }}
          >
            <Box>
              <Typography
                variant={compact ? "subtitle2" : "subtitle1"}
                sx={{
                  fontWeight: active ? 600 : 500,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.title}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {channelTitle}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default PlaylistItems;
