import { useState, useMemo, createContext, useContext, useEffect } from "react";
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

export const ThemeContext = createContext();

function App() {
  const { data: playlists } = useStoreState((state) => state.playlists);
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('theme-mode');
    return saved || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: '#ff0000',
      },
      background: {
        default: mode === 'dark' ? '#0f0f0f' : '#f9f9f9',
        paper: mode === 'dark' ? '#0f0f0f' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#0f0f0f',
        secondary: mode === 'dark' ? '#aaaaaa' : '#606060',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
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
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
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
    </ThemeContext.Provider>
  );
}

export default App;
