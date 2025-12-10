import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1300 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Finance Dashboard
        </Typography>
        {["news", "crypto", "stocks", "budget"].map((section) => (
          <Button color="inherit" key={section} href={`#${section}`}>
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}
