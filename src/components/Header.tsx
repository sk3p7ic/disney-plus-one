import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState, useRef, forwardRef } from "react";

const pages = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Search",
    href: "/search",
  },
  {
    name: "Favorites",
    href: "/favorites",
  },
];

export const Header = forwardRef<HTMLDivElement>((_, ref) => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const navMenuButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AppBar
      position="fixed"
      sx={{ top: 0, left: 0, right: 0, flexGrow: 1, flexDirection: "row" }}
      ref={ref}
    >
      <Container
        maxWidth="xl"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Toolbar disableGutters>
          <Typography variant="h5">Disney Lookup</Typography>
        </Toolbar>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              href={page.href}
              key={page.name}
              sx={{ color: "white", display: "block" }}
            >
              {page.name}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: { sm: "flex", md: "none" } }}>
          <IconButton
            size="large"
            color="inherit"
            aria-label="Navigation Menu"
            aria-controls="mobile-nav"
            aria-haspopup="true"
            onClick={() => setShowMobileNav((show) => !show)}
            ref={navMenuButtonRef}
          >
            {showMobileNav ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Menu
            open={showMobileNav}
            id="mobile-nav"
            anchorEl={navMenuButtonRef.current}
            onClose={() => setShowMobileNav(false)}
          >
            {pages.map((page) => (
              <MenuItem key={page.name} href={page.href}>
                <Typography>{page.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Container>
    </AppBar>
  );
});
