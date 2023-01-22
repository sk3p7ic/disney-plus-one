import { Box, Pagination } from "@mui/material";
import { useSearchQuery } from "../../contexts/SearchQueryContext";

export const SearchNavigator = () => {
  // Get the state from the context
  const {
    searchQuery: { loading, error, data },
    page,
    changePage,
  } = useSearchQuery();

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  // Get the number of pages of data available to query
  const pageCount = data?.characters.paginationInfo.totalPages ?? 1;
  console.log(data);

  /**
   * Handles the changing of the page by updating the context's state.
   * @param _ The event source of the callback.
   * @param p The page selected.
   */
  const handlePageChange = (_: any, p: number) => {
    changePage(p);
  };

  return (
    <Box display="flex" justifyContent="center" padding={2}>
      <Pagination
        count={pageCount}
        defaultPage={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        color="secondary"
      />
    </Box>
  );
};
