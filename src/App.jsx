import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/navbar";
import { BrowserRouter, Route, Routes } from "react-router";
import HomeLayout from "./components/Home";
import NotFound from "./components/NotFound";
import PlayerPage from "./components/player-page";
import { useStoreState } from "easy-peasy";
import VideoItem from "./components/player-page/video-item";
import PlaylistDescription from "./components/player-page/playlist-description";

function App() {
  const { data: playlists } = useStoreState((state) => state.playlists);

  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route
            path="player/:playlistId"
            element={<PlayerPage playlists={playlists} />}
          >
            <Route index element={<PlaylistDescription />} />
            <Route path=":videoId" element={<VideoItem />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
