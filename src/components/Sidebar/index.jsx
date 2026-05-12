import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Toolbar,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link as RouterLink, useLocation } from "react-router";

const drawerWidth = 240;

const Sidebar = ({ open, variant, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "History", icon: <HistoryIcon />, path: "/history" },
    { text: "Favorites", icon: <FavoriteIcon />, path: "/favorites" },
  ];

  const drawerContent = (
    <Box sx={{ overflow: "auto", px: 2 }}>
      <Toolbar sx={{ mb: 2 }} /> {/* Space for fixed Navbar */}
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={onClose}
              sx={{
                borderRadius: 2,
                "&.Mui-selected": {
                  bgcolor: "action.selected",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? "primary.main" : "text.secondary",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 700 : 500,
                  fontSize: "0.9rem",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2, mx: -2 }} />
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: variant === "temporary" ? "auto" : drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          border: "none",
          bgcolor: "background.default",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
