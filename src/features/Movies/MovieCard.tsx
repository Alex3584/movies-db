import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface MovieCardProps {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  image?: string;
}

export function MovieCard({
  id,
  title,
  overview,
  popularity,
  image = "src/assets/movie-thumb.png",
}: MovieCardProps) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia component="div" image={image} sx={{ pt: "56.25%" }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {overview}
        </Typography>
        <Typography variant="button" display="block" mt={2}>
          {popularity}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={RouterLink} to={`/movies/${id}`} color="secondary">
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
