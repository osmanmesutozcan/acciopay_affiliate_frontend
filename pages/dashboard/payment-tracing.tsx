import useSWR from "swr";
import Link from "next/link";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

import { Layout } from "../../components/common/layoutComponents/Layout";
import { IErrorProps } from "../../components/common/layoutComponents/Error";
import { TablePaginationActions } from "../../components/TablePaginationArrowComponent";

import { fetcher } from "../../utils/fetcher";
import { StyledTableCell } from "../../styles/styledMui";
import { formatDistanceToNow } from "date-fns";

interface IPaymentsData {
  id: number;
  status: string;
  created_at: string;
  ambassador_id: number;
  commission_amount: string;
}

interface IDetailData {
  payout: IPaymentsData;
  history: {
    id: number;
    created_at: string;

    from: string;
    to: string;
  }[];
}

export default function PaymentTracing() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paymentId, setPaymentId] = useState<null | number>(null);

  const { data: detailData, error: detailError } = useSWR<{ data: IDetailData }, IErrorProps>(
    paymentId ? `/api/ambassador/payments/${paymentId}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  const { data: paymentsData, error: paymentError } = useSWR<{ data: IPaymentsData[] }, IErrorProps>(
    "/api/ambassador/payments",
    fetcher,
    { revalidateOnFocus: false }
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - paymentsData?.data.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Layout title="Payments" back>
      {paymentId && detailData && (
        <>
          <h3 className="font-bold">Payout History (id: {paymentId})</h3>
          <Table aria-label="simple table" className="mb-12">
            <TableHead>
              <TableRow>
                <StyledTableCell>Status From</StyledTableCell>
                <StyledTableCell>Status To</StyledTableCell>
                <StyledTableCell align="right">Changed At</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {detailData?.data.history.map((row) => (
                <TableRow
                  key={`payment_${row.id}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="odd:bg-gray-light"
                >
                  <StyledTableCell>{row.from ?? "--"}</StyledTableCell>

                  <StyledTableCell>{row.to ?? "--"}</StyledTableCell>

                  <StyledTableCell align="right">
                    {formatDistanceToNow(new Date(row.created_at), { addSuffix: true })}
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
                  count={paymentsData?.data.length}
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
                  classes={{ toolbar: "px-0 " }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </>
      )}

      <h3 className="font-bold">All Payouts</h3>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
            <StyledTableCell align="center">Amount</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Requested At</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paymentsData?.data.map((row) => (
            <TableRow
              key={`payment_${row.id}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              className="odd:bg-gray-light"
            >
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>

              <StyledTableCell component="th" scope="row">
                <button className={`underline ${row.id === paymentId ? 'font-bold' : ''}`} onClick={() => setPaymentId(row.id)}>
                  See history
                </button>
              </StyledTableCell>

              <StyledTableCell align="center">{parseFloat(row.commission_amount || "0").toFixed(2)}</StyledTableCell>

              <StyledTableCell align="center">{row.status}</StyledTableCell>

              <StyledTableCell align="center">
                {formatDistanceToNow(new Date(row.created_at), { addSuffix: true })}
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
              count={paymentsData?.data.length}
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
              classes={{ toolbar: "px-0 " }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Layout>
  );
}
