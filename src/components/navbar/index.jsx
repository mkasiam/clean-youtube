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
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";

const Navbar = ({ onMenuClick }) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isDesktop = useMediaQuery("(min-width:900px)");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        color="default" 
        sx={{ 
          py: 1, 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {!isDesktop && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={onMenuClick}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Stack sx={{ flexGrow: 1 }}>
              <Link
                component={RouterLink}
                to="/"
                sx={{ textDecoration: "none", color: 'inherit' }}
              >
                <Typography variant={isMobile ? "h6" : "h4"} fontWeight={700}>
                  Clean Youtube
                </Typography>
              </Link>
            </Stack>

            <Button
              onClick={handleClickOpen}
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ borderRadius: 50, px: 3 }}
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
