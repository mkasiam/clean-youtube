import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Container, Stack, IconButton } from "@mui/material";
import { useState } from "react";
import PlaylistForm from "../playlist-form";
import { Link as RouterLink } from "react-router";
import { Link } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useMediaQuery } from "@mui/material";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 16 }}>
      <AppBar position="fixed" color="default" sx={{ py: 2 }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Stack sx={{ flexGrow: 1 }}>
              <Link
                component={RouterLink}
                to="/"
                sx={{ textDecoration: "none" }}
              >
                <Typography variant={isMobile ? "h6" : "h4"}>
                  Clean Youtube
                </Typography>
              </Link>
              {!isMobile && (
                <Link
                  href="https://www.youtube.com/@mkasiam"
                  target="_blank"
                  underline="hover"
                >
                  <Typography variant="body1">By MKA</Typography>
                </Link>
              )}
            </Stack>

            <Button
              onClick={handleClickOpen}
              variant="contained"
              startIcon={<AddIcon />}
            >
              Add Playlist
            </Button>

            <PlaylistForm open={open} handleClose={handleClose} />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
