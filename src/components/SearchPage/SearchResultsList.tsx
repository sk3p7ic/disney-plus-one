import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Favorite, FavoriteBorder, Tv, Movie } from "@mui/icons-material";
import { useSearchQuery } from "../../contexts/SearchQueryContext";
import { useFavorites } from "../../contexts/FavoritesContext";

export const SearchResultsList = () => {
  // Get the state from the context
  const {
    searchQuery: { loading, error, data },
  } = useSearchQuery();

  // Get the favorites context state
  const { favorites, toggleFavorite } = useFavorites();

  // If this query has not finished or has had an error
  if (loading || error) return <div></div>;

  // Get the list of characters from the queried data
  const characters = data?.characters.items ?? [];

  /**
   * Shortens / truncates a name for easier display.
   * @param name The name of the film or show to shorten.
   * @returns The shortened name, to 18 charaters including ellipses if the
   * name was longer than 18 characters, else the name.
   */
  const shortenName = (name: string) =>
    name.length < 18 ? name : name.slice(0, 15) + "...";

  return (
    <div>
      <Grid container spacing={2} paddingX="auto">
        {characters.map((character) => (
          <Grid item xs={6} md={4} key={character._id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                image={character.imageUrl}
                height="200"
                alt={character.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5">{character.name}</Typography>
                <Grid container spacing={1}>
                  {character.films.length > 0 &&
                    character.films.map((film) => (
                      <Grid item key={film}>
                        <Chip icon={<Movie />} label={shortenName(film)} />
                      </Grid>
                    ))}
                  {character.tvShows.length > 0 &&
                    character.tvShows.map((show) => (
                      <Grid item key={show}>
                        <Chip icon={<Tv />} label={shortenName(show)} />
                      </Grid>
                    ))}
                </Grid>
              </CardContent>
              <CardActions>
                <Button href={`/search/${character._id}`}>
                  View More Info
                </Button>
                <IconButton
                  onClick={() =>
                    toggleFavorite({
                      id: character._id,
                      name: character.name,
                      imageUrl: character.imageUrl,
                    })
                  }
                >
                  {favorites.has(character._id) ? (
                    <Favorite />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
