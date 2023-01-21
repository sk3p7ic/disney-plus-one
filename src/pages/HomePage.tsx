import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { getLastPageItemCount, getTotalPages } from "../util/queries";
import DisneyBg from "../assets/Disney-Bg.jpg";

export const HomePage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    loading: totalPageLoading,
    error: totalPageError,
    data: totalPageData,
  } = getTotalPages();
  const {
    loading: lastPageLoading,
    error: lastPageError,
    data: lastPageData,
  } = getLastPageItemCount(pageNumber);

  useEffect(() => {
    setPageNumber(totalPageData?.characters.paginationInfo.totalPages ?? 1);
  }, [totalPageData]);

  if (totalPageLoading || lastPageLoading) return <main>Loading...</main>;
  if (totalPageError || lastPageError) return <main>Error...</main>;

  const totalCharacters =
    50 * (pageNumber - 1) +
    (lastPageData?.characters.paginationInfo.pageItemCount ?? 50);

  return (
    <main
      style={{
        flexGrow: 1,
        display: "flex",
        backgroundImage: `url(${DisneyBg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "1rem",
            borderRadius: "0.25rem",
          }}
        >
          <Typography variant="h2" textAlign="center">
            Explore the World of Disney.
          </Typography>
          <Typography textAlign="center">
            Start your adventure of learning about{" "}
            <strong>{totalCharacters}</strong> characters!
          </Typography>
          <Button variant="contained">Get Started</Button>
        </Box>
      </Container>
    </main>
  );
};
