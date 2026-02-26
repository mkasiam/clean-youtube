import { Container, Typography, Grid, Box, Icon, Button } from "@mui/material";
import { Outlet, useParams } from "react-router";
import PlaylistItems from "./playlist-items";
import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PlayerPage = ({ playlists }) => {
  const { playlistId, videoId } = useParams();
  const currentPlaylist = playlists[playlistId];

  const {
    playlistId: currentPlaylistId,
    channelTitle,
    playlistTitle,
    playlistDescription,
    playlistThumbnail,
    playlistItems = [],
  } = currentPlaylist;

  const currentVideoIndex = playlistItems.findIndex(
    (item) => item.videoId === videoId,
  );

  const [videoIndex, setVideoIndex] = useState(currentVideoIndex || 0);
  const [togglePlaylistItems, setTogglePlaylistItems] = useState(false);

  const isVideoRoute = Boolean(videoId);

  useEffect(() => {
    if (!isVideoRoute) {
      setTogglePlaylistItems(true);
    }
  }, [isVideoRoute]);

  if (!currentPlaylist) return <Typography>Playlist not found</Typography>;

  const getVideoIndex = (index) => {
    setVideoIndex(index);
  };

  const toggleSidebar = () => {
    setTogglePlaylistItems(!togglePlaylistItems);
  };

  return (
    <Container maxWidth="lg">
      {isVideoRoute && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={toggleSidebar}
            startIcon={!togglePlaylistItems && <ArrowBackIosNewIcon />}
            endIcon={togglePlaylistItems && <ArrowForwardIosIcon />}
            title="Show | Hide Element"
            variant="outlined"
          >
            {togglePlaylistItems ? "Hide Sidebar" : "Show Sidebar"}
          </Button>
        </Box>
      )}
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* VideoPlayer Outlet  */}
        <Box
          sx={{
            flex: {
              xs: "1 1 100%",
              md: isVideoRoute ? "2 1 0%" : "1 1 0%",
            },
            minWidth: 0,
          }}
          id="#video"
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
        {togglePlaylistItems && (
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
              position: "relative",
            }}
          >
            {/* Video Completion Indicator  */}
            {isVideoRoute && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  boxShadow: 3,
                  mb: 1,
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  {playlistTitle}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {channelTitle} • {videoIndex + 1}/{playlistItems.length}
                </Typography>
              </Box>
            )}

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
                  getVideoIndex={getVideoIndex}
                  channelTitle={channelTitle}
                  compact={isVideoRoute}
                  active={item.videoId === videoId}
                />
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Container>
  );
};

export default PlayerPage;
