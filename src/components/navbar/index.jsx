import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Container, Stack, IconButton, Tooltip } from "@mui/material";
import { useState, useContext } from "react";
import PlaylistForm from "../playlist-form";
import { Link as RouterLink } from "react-router";
import { Link } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useMediaQuery } from "@mui/material";
import { ThemeContext } from "../../App";

const YouTubeLogo = () => (
  <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style={{ width: 40, height: 40, fill: '#FF0000' }}>
    <g>
      <path d="M22.54,6.42a2.78,2.78,0,0,0-1.94-2C18.88,4,12,4,12,4s-6.88,0-8.6.46a2.78,2.78,0,0,0-1.94,2A29,29,0,0,0,1,11.75a29,29,0,0,0,.46,5.33,2.78,2.78,0,0,0,1.94,2c1.72.46,8.6.46,8.6.46s6.88,0,8.6-.46a2.78,2.78,0,0,0,1.94-2,29,29,0,0,0,.46-5.33A29,29,0,0,0,22.54,6.42ZM9.75,15.02V8.48l5.75,3.27Z"></path>
    </g>
  </svg>
);

const Navbar = ({ onMenuClick }) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const { mode, toggleTheme } = useContext(ThemeContext);

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
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={onMenuClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            
            <Stack sx={{ flexGrow: 1 }}>
              <Link
                component={RouterLink}
                to="/"
                sx={{ 
                  textDecoration: "none", 
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <YouTubeLogo />
                {!isMobile && (
                  <Typography variant="h5" fontWeight={700} sx={{ letterSpacing: -1 }}>
                    YouTube
                  </Typography>
                )}
              </Link>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
                <IconButton onClick={toggleTheme} color="inherit">
                  {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Tooltip>

              <Button
                onClick={handleClickOpen}
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ 
                  borderRadius: 50, 
                  px: isMobile ? 1 : 3, 
                  textTransform: 'none', 
                  fontWeight: 600,
                  minWidth: isMobile ? '40px' : 'auto'
                }}
              >
                {!isMobile && "Add Playlist"}
              </Button>
            </Stack>

            <PlaylistForm open={open} handleClose={handleClose} />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
