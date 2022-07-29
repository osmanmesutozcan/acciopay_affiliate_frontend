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
import Skeleton from "@mui/material/Skeleton";

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

  // const {
  //   data: userData,
  //   error: userError,
  //   isValidating: isValidatingUserData,
  //   mutate: mutateUserData,
  // } = useSWR<{ data: ICustomerData }, IErrorProps>("/api/customer/current", fetcher);
  //
  // const {
  //   data: unpaidTransactionsData,
  //   error: unpaidTransactionError,
  //   isValidating: unpaidTransactionData,
  //   mutate: mutateUnpaidTransactionData,
  // } = useSWR<{ data: IUnpaidResponse }, IErrorProps>(
  //   router.query?.id ? `/api/ambassador/unpaid-users/${router.query?.id}` : null,
  //   fetcher
  // );
  //
  // if (userError) {
  //   return router.push("/auth/signup");
  // }
  //
  // if (!userData && isValidatingUserData) {
  //   return (
  //     <Layout contentClassname="py-0 h-full justify-center">
  //       <Loading />
  //     </Layout>
  //   );
  // }
  //
  // if (userData && userData.data.ambassador_verification !== "approved") {
  //   return <NotAmbassadorError ambassadorStatus={userData.data.ambassador_verification} />;
  // }

  return <>Page not found</>;

  // return (
  //   <Layout
  //     back
  //     title={`Due Payments for: ${
  //       unpaidTransactionsData?.data.customer?.name.trim() || unpaidTransactionsData?.data.customer?.legal_full_name
  //     }`}
  //   >
  //     {unpaidTransactionsData ? (
  //       <ul role="list" className="divide-y divide-gray-200">
  //         {unpaidTransactionsData?.data.transactions.map((row) => (
  //           <li key={row.order_id}>
  //             <div className="py-4 sm:px-6">
  //               <div className="flex items-center justify-between">
  //                 <p className="font-medium text-primary truncate">Order ID: {row.order_id}</p>
  //                 <div className="ml-2 flex-shrink-0 flex">
  //                   <p className="px-2 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800">
  //                     {row.order_status === "pending" ? "Initial Payment Pending" : "Installment Due"}
  //                   </p>
  //                 </div>
  //               </div>
  //               <div className="mt-2 sm:flex sm:justify-between">
  //                 <div className="sm:flex">
  //                   <p className="flex items-center text-gray-500">
  //                     Due amount:
  //                     <span className="font-bold text-gray-detail ml-2">
  //                       {parseFloat(row.order_status === "pending" ? row.initial_total : row.monthly_total).toFixed(2)}
  //                     </span>
  //                   </p>
  //                   <p className="mt-2 flex items-center text-gray-500 sm:mt-0 sm:ml-6">
  //                     Due since:
  //                     <span className="font-bold text-gray-detail ml-2">{row.invoice_due_since ?? "N/A"}</span>
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //           </li>
  //         ))}
  //       </ul>
  //     ) : (
  //       <div className="space-y-6">
  //         <Skeleton variant="rectangular" height={100} />
  //       </div>
  //     )}
  //   </Layout>
  // );
}
