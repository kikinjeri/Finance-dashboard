import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Link,
} from "@mui/material";
import axios from "axios";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = "YOUR_API_KEY"; // Replace with your NewsData.io key
    axios
      .get(
        `https://newsdata.io/api/1/news?apikey=${apiKey}&category=technology,business&language=en`
      )
      .then((res) => {
        if (res.data && Array.isArray(res.data.results)) {
          setArticles(res.data.results.slice(0, 10));
        }
      })
      .catch((err) => console.error("Error fetching news:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Paper
      id="news"
      sx={{
        p: 3,
        pt: 14, // leave space for fixed header
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
      >
        Tech & Business News
      </Typography>

      {loading && <Typography>Loading news...</Typography>}
      {!loading && articles.length === 0 && (
        <Typography>No news available at the moment.</Typography>
      )}

      <Grid container spacing={3}>
        {articles
          .filter((a) => a.title && a.link)
          .map((a, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <CardActionArea href={a.link} target="_blank">
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      {a.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {a.description || ""}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {a.source_id || "Unknown source"}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Paper>
  );
}
