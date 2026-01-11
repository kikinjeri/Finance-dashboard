import { Box, Typography, useTheme } from "@mui/material";

export default function Crawler() {
  const theme = useTheme();

  const items = [
    "Welcome to your Finance Dashboard",
    "Latest tech and business news",
    "Live crypto updates",
    "Track your budget effortlessly",
    "Smart insights for better decisions",
  ];

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        whiteSpace: "nowrap",
        py: 1,
      }}
    >
      <Box
        sx={{
          display: "inline-block",
          animation: "scroll 30s linear infinite",
          "@keyframes scroll": {
            "0%": { transform: "translateX(100%)" },
            "100%": { transform: "translateX(-100%)" },
          },
        }}
      >
        {items.map((text, i) => (
          <Typography
            key={i}
            component="span"
            sx={{
              mx: 4,
              fontSize: "1.1rem",
              fontWeight: 500,
              color: theme.palette.text.primary,
            }}
          >
            {text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
