import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 6,
        py: 3,
        textAlign: "center",
        opacity: 0.7,
        fontSize: "0.9rem",
      }}
    >
      <Typography>
        Made with ❤️ by <strong>Mwihaki George</strong>
      </Typography>
    </Box>
  );
}
