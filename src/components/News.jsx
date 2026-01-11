import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Box,
} from "@mui/material";
import { fetchNews } from "../services/fetchNews";

function NewsGrid({ articles }) {
  return (
    <Grid container columns={12} spacing={3}>
      {articles.map((a, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <CardActionArea href={a.link} target="_blank" sx={{ flexGrow: 1 }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {a.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, flexGrow: 1 }}
                >
                  {a.description?.slice(0, 140) || ""}...
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Chip
                    label={a.category?.[0] || "General"}
                    size="small"
                    sx={{ textTransform: "capitalize" }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {a.source_id || "Unknown source"}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default function News({ useMock = false }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(true);

    fetchNews()
      .then((data) => {
        console.log("NEWS DATA:", data);

        const filteredArticles = data.filter((a) =>
          ["technology", "business"].some((cat) => a.category?.includes(cat))
        );

        setArticles(filteredArticles.slice(0, 12));
      })
      .catch((err) => {
        console.error("NEWS ERROR:", err);
        setError(err.message || "Error fetching news");
      })
      .finally(() => setLoading(false));
  }, [useMock]);

  return (
    <Paper id="news" sx={{ p: 4, borderRadius: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
      >
        Tech & Business News
      </Typography>

      {loading && <Typography>Loading news...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && <NewsGrid articles={articles} />}
    </Paper>
  );
}
