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
  
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebar-open');
    if (location.pathname.includes("/player")) return false;
    return saved !== null ? JSON.parse(saved) : isDesktop;
  });

  useEffect(() => {
    if (location.pathname.includes("/player")) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('sidebar-open', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isPlayerPage = location.pathname.includes("/player");

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
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
          minWidth: 0,
          mt: { xs: 7, sm: 8, md: 9 },
          px: isPlayerPage ? 0 : { xs: 2, sm: 3 },
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(isDesktop && {
            marginLeft: sidebarOpen ? 0 : `-${drawerWidth}px`,
          }),
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
