import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../navbar";
import Sidebar from "../Sidebar";
import { Outlet, useLocation } from "react-router";

const MainLayout = () => {
  const theme = useTheme();
  const location = useLocation();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  
  // Sidebar state: open by default on desktop, closed on mobile
  const [sidebarOpen, setSidebarOpen] = useState(isDesktop);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Check if we are in the video section (player/:playlistId/:videoId)
  const isVideoPage = location.pathname.includes("/player/") && location.pathname.split("/").length > 3;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {!isVideoPage && <Navbar onMenuClick={handleDrawerToggle} />}
      
      <Sidebar
        variant={isDesktop ? "persistent" : "temporary"}
        open={sidebarOpen}
        onClose={handleDrawerToggle}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { 
            md: sidebarOpen ? `calc(100% - 240px)` : "100%" 
          },
          ml: { 
            md: sidebarOpen ? 0 : 0 
          },
          mt: !isVideoPage ? { xs: 7, sm: 8, md: 9 } : 0,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
