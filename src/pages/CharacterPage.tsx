import { DocumentNode, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
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
import {
  ErrorStateComponent,
  LoadingStateComponent,
} from "../components/QueryAltStates";
import { TopicListing } from "../components/CharacterPage/TopicListing";

export const loader = ({ params }: any) => {
  return !isNaN(Number(params.character))
    ? getCharacterById(params.character)
    : getCharacterByName(params.character);
};

export const CharacterPage = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const { loading, error, data } = useQuery(useLoaderData() as DocumentNode);

  if (loading) return <LoadingStateComponent />;
  if (error) return <ErrorStateComponent error={error} />;

  const character =
    (data.character as LongCharacter) ??
    (data.characterByName as LongCharacter);

  if (!character)
    return <ErrorStateComponent error={"Character does not exist"} />;

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
            <IconButton
              onClick={() =>
                toggleFavorite({
                  id: character._id,
                  name: character.name,
                  imageUrl: character.imageUrl,
                })
              }
            >
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
            <TopicListing
              title="Filmography"
              items={character.films.concat(
                character.shortFilms.map((film) => `${film} (Short Film)`)
              )}
              icon={<Movie />}
            />
          )}

          {character.tvShows.length > 0 && (
            <TopicListing
              title="TV Shows"
              items={character.tvShows}
              icon={<Tv />}
            />
          )}

          {character.parkAttractions.length > 0 && (
            <TopicListing
              title="Attractions"
              items={character.parkAttractions}
              icon={<Attractions />}
            />
          )}

          {character.alignment && (
            <Typography variant="h6">{character.alignment}</Typography>
          )}

          {character.allies.length > 0 && (
            <TopicListing
              title="Allies"
              items={character.allies}
              icon={<AccountCircle />}
              linkMode
            />
          )}

          {character.enemies.length > 0 && (
            <TopicListing
              title="Enemies"
              items={character.enemies}
              icon={<NoAccounts />}
              linkMode
            />
          )}
        </CardContent>
      </Card>
    </Container>
  );
};
