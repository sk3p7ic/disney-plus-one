import { Pagination } from "@mui/material";
import { useSearchQuery } from "../../contexts/SearchQueryContext";

export const SearchNavigator = () => {
  const {
    searchQuery: { loading, error, data },
    page,
    changePage,
  } = useSearchQuery();

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const pageCount = data?.characters.paginationInfo.totalPages ?? 1;
  console.log(data);

  const handlePageChange = (_: any, p: number) => {
    changePage(p);
  };

  return (
    <div>
      <Pagination
        count={pageCount}
        defaultPage={page}
        onChange={handlePageChange}
      />
    </div>
  );
};
