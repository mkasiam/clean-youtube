import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router";
import HomeLayout from "./components/Home";
import NotFound from "./components/NotFound";
import PlayerPage from "./components/player-page";
import { useStoreState } from "easy-peasy";
import VideoItem from "./components/player-page/video-item";
import PlaylistDescription from "./components/player-page/playlist-description";
import MainLayout from "./components/Layout/MainLayout";
import HistoryPage from "./components/History";
import FavoritesPage from "./components/Favorites";

function App() {
  const { data: playlists } = useStoreState((state) => state.playlists);

  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomeLayout />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route
              path="player/:playlistId"
              element={<PlayerPage playlists={playlists} />}
            >
              <Route index element={<PlaylistDescription />} />
              <Route path=":videoId" element={<VideoItem />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
