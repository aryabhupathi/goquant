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
import MenuIcon from "@mui/icons-material/Menu";
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
        bgcolor: "#111827", 
        color: "#F9FAFB", 
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          my: 2,
          color: "#8B5CF6", 
          fontWeight: "bold",
        }}
      >
        StockVibe
      </Typography>
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              sx={{
                textAlign: "center",
                color: "#F9FAFB",
                "&:hover": {
                  bgcolor: "#8B5CF6",
                  color: "#FFFFFF",
                },
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
      <AppBar
        component="nav"
        position="static"
        sx={{
          bgcolor: "#111827", 
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: "#8B5CF6", 
                  fontWeight: "bold",
                  flexGrow: 1,
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  cursor: "pointer",
                  
                  
                  
                }}
              >
                StockVibe
              </Typography>
            </Link>
          </Box>
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  href={item.href}
                  sx={{
                    color: "#F9FAFB",
                    fontWeight: 500,
                    "&:hover": {
                      bgcolor: "#8B5CF6",
                      color: "white",
                      borderRadius: 2,
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ color: "#F9FAFB" }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
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
            bgcolor: "#111827",
            color: "#F9FAFB",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
export default Header;
