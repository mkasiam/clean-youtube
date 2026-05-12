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
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff0000', // YouTube Red
    },
    background: {
      default: '#0f0f0f', // YouTube Dark Background
      paper: '#0f0f0f',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 50,
        },
      },
    },
  },
});

function App() {
  const { data: playlists } = useStoreState((state) => state.playlists);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
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
    </ThemeProvider>
  );
}

export default App;
