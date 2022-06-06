import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import React, { useState } from "react";
import { StyledTableCell } from "../../styles/styledMui";
import { Layout } from "../../components/common/layoutComponents/Layout";
import { TablePaginationActions } from "../../components/TablePaginationArrowComponent";
import { Loading } from "../../components/common/layoutComponents/Loading";
import { IErrorProps, NotAmbassadorError } from "../../components/common/layoutComponents/Error";
import useSWR from "swr";
import { ICustomerData } from "../../utils/schema";
import { fetcher } from "../../utils/fetcher";
import { useRouter } from "next/router";

function createData(name: string, calories: number, fat: string, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("some@one.com", 159, "6 / 10", 24, 4.0),
  createData("any@one.com", 237, "3 / 4", 37, 4.3),
  createData("no@one.com", 262, "1 / 2", 24, 6.0),
];

export default function PaymentTracing() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    data: userData,
    error: userError,
    isValidating: isValidatingUserData,
    mutate: mutateUserData,
  } = useSWR<{ data: ICustomerData }, IErrorProps>("/api/customer/current", fetcher);

  if (userError) {
    return router.push("/auth/signup");
  }

  if (!userData && isValidatingUserData) {
    return (
      <Layout contentClassname="py-0 h-full justify-center">
        <Loading />
      </Layout>
    );
  }

  if (userData && userData.data.ambassador_verification !== "approved") {
    return <NotAmbassadorError ambassadorStatus={userData.data.ambassador_verification} />;
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Layout title="Payment tracing">
      <Table aria-label="payment tracing">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">User</StyledTableCell>
            <StyledTableCell align="center">Unpaid amount</StyledTableCell>
            <StyledTableCell align="center">Transactions left</StyledTableCell>
            {/*<TableCell align="right">Carbs&nbsp;(g)</TableCell>*/}
            {/*<TableCell align="right">Protein&nbsp;(g)</TableCell>*/}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              className="odd:bg-gray-light"
            >
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.calories}</StyledTableCell>
              <StyledTableCell align="center">{row.fat}</StyledTableCell>
              {/*<TableCell align="right">{row.carbs}</TableCell>*/}
              {/*<TableCell align="right">{row.protein}</TableCell>*/}
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={3} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={10}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Layout>
  );
}
