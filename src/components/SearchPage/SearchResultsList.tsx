import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { Tv, Movie } from "@mui/icons-material";
import { useSearchQuery } from "../../contexts/SearchQueryContext";

export const SearchResultsList = () => {
  const {
    searchQuery: { loading, error, data },
  } = useSearchQuery();

  if (loading || error) return <div></div>;

  const characters = data?.characters.items ?? [];

  const shortenName = (name: string) =>
    name.length < 18 ? name : name.slice(0, 15) + "...";

  return (
    <div>
      <Grid container spacing={2} paddingX="auto">
        {characters.map((character) => (
          <Grid item xs={4} key={character._id}>
            <Card>
              <CardMedia
                component="img"
                image={character.imageUrl}
                height="200"
                alt={character.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
