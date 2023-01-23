import { Box, IconButton, Pagination, Stack, TextField } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { useSearchQuery } from "../../contexts/SearchQueryContext";
import { useRef } from "react";

export const SearchNavigator = () => {
  /** Stores a reference to the TextField where the user may manually jump to a page. */
  const manualPageField = useRef<HTMLDivElement | null>(null);

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

  /**
   * Handles the changing of the page by updating the context's state.
   * @param _ The event source of the callback.
   * @param p The page selected.
   */
  const handlePageChange = (_: any, p: number) => {
    changePage(p);
  };

  const handleJumpToPage = () => {
    const inputElem = manualPageField.current?.querySelector("input");
    if (!inputElem) return;
    if (!isNaN(Number(inputElem.value)) && Number(inputElem.value) <= pageCount)
      changePage(Number(inputElem.value));
    inputElem.value = "";
  };

  return (
    <Box display="flex" justifyContent="center" padding={2}>
      <Stack spacing={2}>
        <Pagination
          count={pageCount}
          defaultPage={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="secondary"
        />
        <Stack direction="row" spacing={1}>
          <TextField
            variant="outlined"
            size="small"
            label="Jump to page."
            sx={{ flexGrow: 1 }}
            ref={manualPageField}
          />
          <IconButton onClick={() => handleJumpToPage()}>
            <Refresh />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};
