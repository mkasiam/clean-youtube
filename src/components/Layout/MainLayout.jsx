import { useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../navbar";
import Sidebar from "../Sidebar";
import { Outlet, useLocation } from "react-router";

const drawerWidth = 240;

const MainLayout = () => {
  const theme = useTheme();
  const location = useLocation();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  
  // Sidebar state: open by default on desktop, closed on mobile
  const [sidebarOpen, setSidebarOpen] = useState(isDesktop);

  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: 'background.default' }}>
      <Navbar onMenuClick={handleDrawerToggle} />
      
      <Sidebar
        variant={isDesktop ? "persistent" : "temporary"}
        open={sidebarOpen}
        onClose={handleDrawerToggle}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          minWidth: 0, // Critical for flex children to not overflow
          mt: { xs: 7, sm: 8, md: 9 },
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(isDesktop && sidebarOpen && {
            ml: 0, // Since variant is persistent, we don't need margin shift if width is calculated
            width: `calc(100% - ${drawerWidth}px)`,
          }),
        }}
      >
        <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
