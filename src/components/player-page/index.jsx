import { Container, Typography } from "@mui/material";
import { useParams } from "react-router";

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

export default PlayerPage;
