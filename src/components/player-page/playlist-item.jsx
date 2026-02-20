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

const PlaylistItem = ({ item, index }) => {
  return (
    <Grid item xs={12}>
      <Link
        to={`/player/v/${item.videoId}`}
        component={RouterLink}
        sx={{ textDecoration: "none" }}
      >
        <Card
          sx={{
            display: "flex",
            padding: "8px",
            "&:hover": { bgcolor: "#f1e7e7" },
          }}
        >
          <Chip label={index + 1} size="small" sx={{ mt: 6, mr: 1 }} />
          <CardMedia
            component="img"
            image={item.thumbnail.url}
            alt={item.title}
            sx={{ width: 200, height: 112, objectFit: "cover" }}
          />
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "500" }}>
                {item.title}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {item.channelTitle}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default PlaylistItem;
