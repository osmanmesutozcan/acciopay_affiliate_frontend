import useSWR from "swr";
import { useRouter } from "next/router";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import React, { useState } from "react";

import { StyledTableCell } from "../../../styles/styledMui";
import { Layout } from "../../../components/common/layoutComponents/Layout";
import { TablePaginationActions } from "../../../components/TablePaginationArrowComponent";
import { Loading } from "../../../components/common/layoutComponents/Loading";
import { IErrorProps, NotAmbassadorError } from "../../../components/common/layoutComponents/Error";
import { ICustomerData } from "../../../utils/schema";
import { fetcher } from "../../../utils/fetcher";

interface IUnpaidTransactionsData {
  order_id: number;
  invoice_id: number;
  monthly_total: string;
  initial_total: string;
  invoice_due_since: string;
  invoice_state: "pending" | "paid";
  order_status: "pending" | "ongoing_payment";
}

interface IUnpaidResponse {
  customer: ICustomerData;
  transactions: IUnpaidTransactionsData[];
}

export default function Id() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    data: userData,
    error: userError,
    isValidating: isValidatingUserData,
    mutate: mutateUserData,
  } = useSWR<{ data: ICustomerData }, IErrorProps>("/api/customer/current", fetcher);

  const {
    data: unpaidTransactionsData,
    error: unpaidTransactionError,
    isValidating: unpaidTransactionData,
    mutate: mutateUnpaidTransactionData,
  } = useSWR<{ data: IUnpaidResponse }, IErrorProps>(
    router.query?.id ? `/api/ambassador/unpaid-users/${router.query?.id}` : null,
    fetcher
  );

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - unpaidTransactionsData?.data.transactions.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Layout
      back
      title={`Due Payments for: ${
        unpaidTransactionsData?.data.customer?.name.trim() || unpaidTransactionsData?.data.customer?.legal_full_name
      }`}
    >
      <Table aria-label="payment tracing">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Id</StyledTableCell>
            <StyledTableCell>Due Since</StyledTableCell>
            <StyledTableCell>Due Amount</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {unpaidTransactionsData?.data.transactions.map((row) => (
            <TableRow
              key={`unpaid_t_${row.invoice_id}_${row.order_id}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              className="odd:bg-gray-light"
            >
              <StyledTableCell component="th" scope="row">
                {row.order_id}
              </StyledTableCell>

              <StyledTableCell>{row.invoice_due_since ?? "N/A"}</StyledTableCell>

              <StyledTableCell>
                {parseFloat(row.order_status === "pending" ? row.initial_total : row.monthly_total).toFixed(2)}
              </StyledTableCell>

              <StyledTableCell>
                {row.order_status === "pending" ? "Initial Payment Pending" : "Installment Due"}
              </StyledTableCell>
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
              count={unpaidTransactionsData?.data.transactions.length}
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
