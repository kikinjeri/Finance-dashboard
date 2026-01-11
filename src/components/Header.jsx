import { Box, IconButton, Button } from "@mui/material";
import { LightMode, DarkMode, Menu as MenuIcon } from "@mui/icons-material";

export default function Header({ mode, setMode }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
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

        // 🔥 Solid background (no transparency)
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      {/* Mobile menu icon */}
      <IconButton sx={{ display: { xs: "flex", md: "none" } }} color="inherit">
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
  );
}
