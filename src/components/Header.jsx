import { useState } from "react";
import {
  Box,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { LightMode, DarkMode, Menu as MenuIcon } from "@mui/icons-material";

export default function Header({ mode, setMode }) {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false); // close drawer after clicking
  };

  return (
    <>
      <Box
        component="nav"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, md: 4 },
          py: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        {/* Mobile menu icon */}
        <IconButton
          sx={{ display: { xs: "flex", md: "none" } }}
          color="inherit"
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Desktop navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 4,
            mx: "auto",
          }}
        >
          <Button color="inherit" onClick={() => scrollTo("crypto-section")}>
            Crypto Market
          </Button>

          <Button color="inherit" onClick={() => scrollTo("news-section")}>
            News
          </Button>

          <Button color="inherit" onClick={() => scrollTo("budget-section")}>
            Budget
          </Button>
        </Box>

        {/* Theme toggle */}
        <IconButton
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          color="inherit"
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            p: 1,
          }}
        >
          {mode === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Box>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 240, p: 2 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => scrollTo("crypto-section")}>
                <ListItemText primary="Crypto Market" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => scrollTo("news-section")}>
                <ListItemText primary="News" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => scrollTo("budget-section")}>
                <ListItemText primary="Budget" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
