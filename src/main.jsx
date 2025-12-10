import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

// Global + existing CSS
import "./global.css";
import "./index.css";

const theme = createTheme({
  palette: { mode: "dark" },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
