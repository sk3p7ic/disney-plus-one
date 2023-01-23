import { DocumentNode, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  Attractions,
  Favorite,
  FavoriteBorder,
  Movie,
  NoAccounts,
  Tv,
} from "@mui/icons-material";
import { useLoaderData } from "react-router-dom";
import {
  getCharacterById,
  getCharacterByName,
  LongCharacter,
} from "../util/queries";
import { useFavorites } from "../contexts/FavoritesContext";

export const loader = ({ params }: any) => {
  return !isNaN(Number(params.character))
    ? getCharacterById(params.character)
    : getCharacterByName(params.character);
};

export const CharacterPage = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const { loading, error, data } = useQuery(useLoaderData() as DocumentNode);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const character =
    (data.character as LongCharacter) ??
    (data.characterByName as LongCharacter);

  return (
    <Container maxWidth="md">
      <Card sx={{ marginY: 2 }}>
        <CardMedia
          component="img"
          height={400}
          src={character.imageUrl}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Stack direction="row" spacing={2}>
            <Typography variant="h4">{character.name}</Typography>
            <IconButton onClick={() => toggleFavorite(character._id)}>
              {favorites.has(character._id) ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Stack>
          <Button
            variant="contained"
            color="secondary"
            href={character.sourceUrl}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            View Wiki Page
          </Button>
          {(character.films.length > 0 || character.shortFilms.length > 0) && (
            <Stack>
              <Typography variant="h6">Filmography:</Typography>
              <List>
                {character.films.map((film) => (
                  <ListItem key={film}>
                    <ListItemIcon>
                      <Movie />
                    </ListItemIcon>
                    <ListItemText>{film}</ListItemText>
                  </ListItem>
                ))}
                {character.shortFilms.map((film) => (
                  <ListItem key={film}>
                    <ListItemIcon>
                      <Movie />
                    </ListItemIcon>
                    <ListItemText>{film} (Short Film)</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Stack>
          )}
          {character.tvShows.length > 0 && (
            <Stack>
              <Typography variant="h6">TV Shows:</Typography>
              <List>
                {character.tvShows.map((show) => (
                  <ListItem key={show}>
                    <ListItemIcon>
                      <Tv />
                    </ListItemIcon>
                    <ListItemText>{show}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Stack>
          )}
          {character.parkAttractions.length > 0 && (
            <Stack>
              <Typography variant="h6">Attractions:</Typography>
              <List>
                {character.parkAttractions.map((attraction) => (
                  <ListItem key={attraction}>
                    <ListItemIcon>
                      <Attractions />
                    </ListItemIcon>
                    <ListItemText>{attraction}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Stack>
          )}
          {character.alignment && (
            <Typography variant="h6">{character.alignment}</Typography>
          )}
          {character.allies.length > 0 && (
            <Stack>
              <Typography variant="h6">Allies:</Typography>
              <List>
                {character.allies.map((ally) => (
                  <ListItem key={ally}>
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText>
                      <a href={`/search/${ally}`}>{ally}</a>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Stack>
          )}
          {character.enemies.length > 0 && (
            <Stack>
              <Typography variant="h6">Enemies:</Typography>
              <List>
                {character.enemies.map((enemy) => (
                  <ListItem key={enemy}>
                    <ListItemIcon>
                      <NoAccounts />
                    </ListItemIcon>
                    <ListItemText>
                      <a href={`/search/${enemy}`}>{enemy}</a>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};
