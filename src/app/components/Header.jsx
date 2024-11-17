"use client";
import React, { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
const drawerWidth = 240;
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
const Header = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        bgcolor: "#001f3f",
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{ my: 2, color: "gold", fontWeight: "bold" }}
      >
        TRACKSTOCK
      </Typography>
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              sx={{
                textAlign: "center",
                color: "gold",
                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <AppBar component="nav" position="static" sx={{ bgcolor: "#001f3f" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { xs: "block", sm: "none" } }}
              >
                <MenuIcon sx={{ color: "gold" }} />
              </IconButton>
            </Box>
          )}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: "gold",
                  textAlign: "left",
                  flexGrow: 1,
                }}
              >
                TRACKSTOCK
              </Typography>
              <Box>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={Link}
                    href={item.href}
                    sx={{
                      color: "gold",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "black",
              color: "white",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};
export default Header;
