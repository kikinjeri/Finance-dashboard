import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: { default: "#f7f9fc" },
          }
        : {
            background: { default: "#0d1117" },
          }),
    },
    typography: {
      fontFamily: "Inter, Roboto, sans-serif",
    },
  });
