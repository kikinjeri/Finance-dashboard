import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1300 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Finance Dashboard
        </Typography>
        <Button color="inherit" href="#news">
          News
        </Button>
        <Button color="inherit" href="#crypto">
          Crypto
        </Button>
        <Button color="inherit" href="#stocks">
          Stocks
        </Button>
        <Button color="inherit" href="#budget">
          Budget
        </Button>
      </Toolbar>
    </AppBar>
  );
}
