import { Container, Typography, Grid, Box } from "@mui/material";
import { Outlet, useParams } from "react-router";
import PlaylistItems from "./playlist-items";

const PlayerPage = ({ playlists }) => {
  const { playlistId, videoId } = useParams();
  const currentPlaylist = playlists[playlistId];

  if (!currentPlaylist) return <Typography>Playlist not found</Typography>;

  const {
    playlistId: currentPlaylistId,
    channelTitle,
    playlistTitle,
    playlistDescription,
    playlistThumbnail,
    playlistItems = [],
  } = currentPlaylist;

  const isVideoRoute = Boolean(videoId);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        gap: 2,
        mt: 16,
        mb: 4,
      }}
    >
      <Box
        sx={{
          flex: {
            xs: "1 1 100%",
            md: isVideoRoute ? "2 1 0%" : "1 1 0%",
          },
          minWidth: 0,
        }}
      >
        <Outlet
          context={{
            channelTitle,
            playlistTitle,
            playlistDescription,
            playlistThumbnail,
            playlistItems,
          }}
        />
      </Box>

      {/* Playlist Items */}
      <Box
        sx={{
          flex: {
            xs: "1 1 100%",
            md: isVideoRoute ? "1 1 0%" : "2 1 0%",
          },
          alignSelf: { xs: "stretch", md: "flex-start" },
          height: { xs: "auto", md: "calc(100vh - 88px)" },
          overflowY: { xs: "visible", md: "auto" },
          paddingRight: { xs: 0, md: 1 },
          minWidth: 0,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {playlistItems.map((item, index) => (
            <PlaylistItems
              key={item.videoId}
              item={item}
              index={index}
              currentPlaylistId={currentPlaylistId}
              channelTitle={channelTitle}
              compact={isVideoRoute}
              active={item.videoId === videoId}
            />
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default PlayerPage;
