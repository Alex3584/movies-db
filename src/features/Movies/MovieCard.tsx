import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { memo } from "react";

interface Props {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  enableUserActions?: boolean;
  image?: string;
  onAddFavorite?(id:number):void
}

function MovieCard({
  id,
  title,
  overview,
  popularity,
  enableUserActions,
  onAddFavorite,
  image = "src/assets/movie-thumb.png",
}: Props) {
  console.count("MovieCard")
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia component="div" image={image} sx={{ pt: "56.25%" }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
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
        {enableUserActions && (<Tooltip title="Add to favorites">
          <IconButton onClick={() => onAddFavorite?.(id)}>
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
        )}
      </CardActions>
    </Card>
  );
}

export default memo(MovieCard);