// Navbar.js
import React, { useState, useMemo, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  useMediaQuery,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Exchange Rates (Live)", path: "/exchange_rates_live" },
  { label: "About", path: "/about" },
  { label: "Error Page", path: "/error" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const isMobile = useMediaQuery("(max-width:960px)");

  const location = useLocation();

  useEffect(() => {
    const pathToLabelMap = {
      "/": "Home",
      "/exchange_rates_live": "Exchange Rates (Live)",
      "/about": "About",
      "/error": "Error Page",
    };
  
    const currentLabel = pathToLabelMap[location.pathname];
    if (currentLabel) {
      setActiveItem(currentLabel);
    }
  }, [location]);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      />
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.label}
            component={Link}
            to={item.path}
            sx={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor:
                activeItem === item.label ? "rgba(0, 0, 255, 0.1)" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 255, 0.1)",
              },
              "&:active": {
                backgroundColor: "rgba(0, 0, 255, 0.2)",
              },
              transition: "background-color 0.3s ease",
            }}
            onClick={() => setActiveItem(item.label)}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={toggleDrawer(true)}
                sx={{
                  mr: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                  "&:active": {
                    transform: "scale(0.95)",
                  },
                  transition: "all 0.2s ease",
                }}
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Loan Calculator
            </Typography>

            {!isMobile &&
              navItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  onClick={() => setActiveItem(item.label)}
                  sx={{
                    color: "inherit",
                    backgroundColor:
                      activeItem === item.label ? "#222222" : "transparent",
                    borderRadius: 1,
                    mx: 1,
                    "&:hover": {
                      backgroundColor:  "rgba(25, 118, 210, 0.1)",
                      color: "white",
                    },
                    "&:active": {
                      transform: "scale(0.97)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {item.label}
                </Button>
              ))}

            <IconButton
              color="inherit"
              onClick={toggleTheme}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
                "&:active": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                  transform: "scale(0.95)",
                },
                transition: "all 0.2s ease",
              }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawer}
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
