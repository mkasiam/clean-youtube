import usePlaylist from "./hooks/usePlaylist";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/navbar";
import PlaylistCardItem from "./components/playlist-card-item";
import { Container, Grid, Typography } from "@mui/material";
import { BrowserRouter, Route, Routes, useParams } from "react-router";
import { useStoreActions } from "easy-peasy";
import { useEffect } from "react";

const playlistId = "PLWc1yfTYfqNGG8W9ypCzYjz6WsuNBEfe8";

const Home = ({ playlistArrays }) => {
  const playlists = useStoreActions((state) => state.playlists);

  useEffect(() => {
    playlists.getPlaylistData(playlistId);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ my: 16 }}>
      {playlistArrays.length > 0 && (
        <Grid container sx={{ alignItems: "stretch" }}>
          {playlistArrays?.map((playlist) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={playlist.playlistId}>
              <PlaylistCardItem
                playlistId={playlist.playlistId}
                playlistThumbnail={playlist.playlistThumbnail}
                playlistTitle={playlist.playlistTitle}
                channelTitle={playlist.channelTitle}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

const NotFound = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 16 }}>
      <Typography variant="h2" align="center">
        404 Page Not Found
      </Typography>
    </Container>
  );
};

const PlayerPage = ({ playlists }) => {
  const { playlistId } = useParams();
  const currentPlaylist = playlists[playlistId];

  if (!currentPlaylist) return;

  const { playlistTitle, playlistDescription } = currentPlaylist;

  return (
    <Container maxWidth="lg" sx={{ mt: 16 }}>
      <Typography variant="h2" align="center">
        {playlistTitle}
      </Typography>
      {playlistDescription?.split("\n").map((item) => (
        <Typography variant="body1" sx={{ my: 2 }}>
          {item}
        </Typography>
      ))}
    </Container>
  );
};

function App() {
  const { getPlaylistById, playlists, error, loading } = usePlaylist();

  const playlistArrays = Object.values(playlists);

  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <Navbar getPlaylistById={getPlaylistById} />
        <Routes>
          <Route path="/" element={<Home playlistArrays={playlistArrays} />} />
          <Route
            path="/player/:playlistId"
            element={<PlayerPage playlists={playlists} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
