import { useParams } from "react-router-dom";
import { useGetConfigurationQuery, useGetMovieDetailsQuery } from "../../services/tmdb";
import {
  Box,
  Container,
  Grid,
  Typography,
  LinearProgress,
  Card,
  CardMedia,
} from "@mui/material";

export function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);

  const { data: movie, isLoading, isError } = useGetMovieDetailsQuery(movieId);
  const { data: config } = useGetConfigurationQuery();

  if (isLoading || !config) return <LinearProgress />;
  if (isError || !movie) return <Typography>Error loading movie.</Typography>;

  const imageBaseUrl = config.images.base_url;
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}w500${movie.poster_path}`
    : undefined;
  const backdropUrl = movie.backdrop_path
    ? `${imageBaseUrl}original${movie.backdrop_path}`
    : undefined;

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 67px)",
        backgroundImage: `url(${backdropUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        position: "relative",
      }}
    >
      <Container maxWidth="md" sx={{ backgroundColor: "rgba(0,0,0,0.7)", borderRadius: 2, p: 4 }}>
        <Grid container spacing={4}>
          {posterUrl && (
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia component="img" image={posterUrl} alt={movie.title} />
              </Card>
            </Grid>
          )}
          <Grid item xs={12} md={8}>
            <Typography variant="h3" gutterBottom>
              {movie.title}
            </Typography>
            {movie.release_date && (
              <Typography variant="subtitle1" gutterBottom>
                Release date: {movie.release_date}
              </Typography>
            )}
            <Typography variant="body1" paragraph>
              {movie.overview}
            </Typography>
            <Typography variant="caption" color="gray">
              Popularity: {movie.popularity}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
