import { Box, Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";

const slides = [
  "Welcome to your Finance Dashboard",
  "Track your budget effortlessly",
  "Stay informed with live market data",
];

export default function SafeCarousel() {
  const theme = useTheme();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: 180,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "background-color 0.3s ease",
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.05)",
        borderRadius: 2,
        mb: 4,
      }}
    >
      <Typography
        sx={{
          fontSize: "1.6rem",
          fontWeight: 600,
          opacity: 0,
          animation: "fadeIn 1s forwards",
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translateY(10px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        {slides[index]}
      </Typography>
    </Box>
  );
}
