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
import { Loading } from "../../components/common/layoutComponents/Loading";

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

  const {
    data: detailData,
    error: detailError,
    isValidating: isValidatingDetailData,
  } = useSWR<{ data: IDetailData }, IErrorProps>(paymentId ? `/api/ambassador/payments/${paymentId}` : null, fetcher, {

  });

  const { data: paymentsData, error: paymentError } = useSWR<{ data: IPaymentsData[] }, IErrorProps>(
    "/api/ambassador/payments",
    fetcher,
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
        <div className="mb-4">
          <h3 className="font-bold">Payout History (id: {paymentId})</h3>
          <ul role="list" className="divide-y divide-gray-200">
            {detailData?.data.history.map((row) => (
              <li key={row.id}>
                <div className="py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-gray-500">
                      Status from:{" "}
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {row.from}
                      </span>
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className=" text-gray-500">
                        Status to:
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {row.to}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-gray-500">
                        Changed at:
                        <span className="text-gray-detail ml-2">
                          {formatDistanceToNow(new Date(row.created_at), { addSuffix: true })}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!detailData && isValidatingDetailData && <Loading />}

      <h3 className="font-bold">All Payouts</h3>
      <ul role="list" className="divide-y divide-gray-200">
        {paymentsData?.data.map((row) => (
          <li key={row.id}>
            <div className="py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="font-medium text-indigo-600 truncate">ID: {row.id}</p>
                <div className="ml-2 flex-shrink-0 flex">
                  <button
                    className={`underline text-xs text-primary ${row.id === paymentId ? "font-bold" : ""}`}
                    onClick={() => setPaymentId(row.id)}
                  >
                    See history
                  </button>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-gray-500">
                    Amount:
                    <span className="text-gray-detail font-semibold ml-2">
                      {parseFloat(row.commission_amount || "0").toFixed(2)}
                    </span>
                  </p>
                  <p className="mt-2 flex items-center text-gray-500 sm:mt-0 sm:ml-6">
                    Status:{" "}
                    <span className="font-semibold ml-2 px-2 inline-flex leading-5 rounded-full bg-green-100 text-green-800">
                      {row.status}
                    </span>
                  </p>
                </div>
                <div className="mt-2 flex items-center text-gray-500 sm:mt-0">
                  <p>
                    Requested at:{" "}
                    <span className="text-gray-detail ml-2">
                      {formatDistanceToNow(new Date(row.created_at), { addSuffix: true })}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
