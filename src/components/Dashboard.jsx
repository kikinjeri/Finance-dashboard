import { Container, Grid, Box } from "@mui/material";
import Crypto from "./Crypto";
import News from "./News";
import Budget from "./Budget";

export default function Dashboard() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
      <Grid container spacing={4}>
        {/* Crypto Section */}
        <Grid item xs={12}>
          <Box id="crypto-section">
            <Crypto />
          </Box>
        </Grid>

        {/* News Section */}
        <Grid item xs={12}>
          <Box id="news-section">
            <News />
          </Box>
        </Grid>

        {/* Budget Section */}
        <Grid item xs={12}>
          <Box id="budget-section">
            <Budget />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
