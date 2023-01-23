import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

type TopicListingProps = {
  /** The title of this list of items. */
  title: string;
  /** This list of items. */
  items: string[];
  /** The icon to display to left of each item, if any. */
  icon?: React.ReactNode;
  /** If the items in this list link to other characters. */
  linkMode?: boolean;
};

export const TopicListing = ({
  title,
  items,
  icon,
  linkMode,
}: TopicListingProps) => {
  return (
    <Stack>
      <Typography variant="h6">{title}:</Typography>
      <List>
        {items.map((item) => (
          <ListItem key={item}>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText>
              {linkMode ? <a href={`/search/${item}`}>{item}</a> : item}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};
