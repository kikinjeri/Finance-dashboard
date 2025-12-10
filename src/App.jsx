import Header from "./components/Header";
import News from "./components/News";
import Crypto from "./components/Crypto";
import Stocks from "./components/Stocks";
import Budget from "./components/Budget";
import { Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ backgroundColor: "background.default", color: "text.primary" }}>
      <Header />
      <News />
      <Crypto />
      <Stocks />
      <Budget />
    </Box>
  );
}

export default App;
