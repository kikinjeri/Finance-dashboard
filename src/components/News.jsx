import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { fetchNews } from "../services/fetchNews";

const mockArticles = [
  {
    title: "Tech News 1",
    description: "Lorem ipsum...",
    link: "#",
    source_id: "MockSource",
  },
  {
    title: "Tech News 2",
    description: "Lorem ipsum...",
    link: "#",
    source_id: "MockSource",
  },
];

export default function News({ useMock = true }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    if (useMock) {
      setArticles(mockArticles);
      setLoading(false);
      return;
    }

    fetchNews()
      .then((data) => setArticles(data))
      .catch((err) => {
        console.error(err);
        setError(err.message || "Error fetching news");
      })
      .finally(() => setLoading(false));
  }, [useMock]);

  return (
    <Paper id="news" sx={{ p: 3, pt: 14, minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
      >
        Tech & Business News
      </Typography>

      {loading && <Typography>Loading news...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && articles.length === 0 && (
        <Typography>No news available.</Typography>
      )}

      <Grid container spacing={3}>
        {articles.map((a, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card
              sx={{
                height: "100%",
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
                    {a.description}
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
