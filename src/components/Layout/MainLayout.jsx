import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../navbar";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router";

const MainLayout = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Navbar onMenuClick={handleDrawerToggle} />
      
      <Sidebar
        variant={isDesktop ? "permanent" : "temporary"}
        open={isDesktop ? true : mobileOpen}
        onClose={handleDrawerToggle}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { md: `calc(100% - 240px)` },
          mt: { xs: 7, sm: 8, md: 9 }, // Responsive margin top for fixed Navbar
          transition: (theme) => theme.transitions.create(['margin', 'width'], {
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
