import { TablePaginationActionsProps } from "@mui/material/TablePagination/TablePaginationActions";
import React from "react";
import { LeftIcon } from "./common/iconComponents/LeftArrowIcon";
import { RightIcon } from "./common/iconComponents/RightArrowIcon";

export function TablePaginationActions(props: TablePaginationActionsProps) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  return (
    <div className="flex items-center space-x-4 mx-4">
      <button onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <LeftIcon className="h-6 w-6" color={page === 0 && "#D6D6D6"} />
      </button>
      <button
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <RightIcon className="h-6 w-6" color={page >= Math.ceil(count / rowsPerPage) - 1 && "#D6D6D6"} />
      </button>
    </div>
  );
}
