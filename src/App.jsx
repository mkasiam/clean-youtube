import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/navbar";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import PlayerPage from "./components/player-page";
import { useStoreState } from "easy-peasy";


function App() {
  const { data } = useStoreState((state) => state.playlists);
  

  const playlistArrays = Object.values(data);

  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home playlistArrays={playlistArrays} />} />
          {/* <Route
            path="/player/:playlistId"
            element={<PlayerPage playlists={playlists} />}
          /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
