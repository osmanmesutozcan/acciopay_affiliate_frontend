import { Layout } from "../../components/common/layoutComponents/Layout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TransactionIconColored } from "../../components/common/iconComponents/TransactionIcon";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { StyledTableCell } from "../../styles/styledMui";
import { TablePaginationActions } from "../../components/TablePaginationArrowComponent";
import useSWR from "swr";
import { ICustomerData } from "../../utils/schema";
import { IErrorProps, NotAmbassadorError } from "../../components/common/layoutComponents/Error";
import {fetcher, poster} from "../../utils/fetcher";
import { useRouter } from "next/router";
import { Loading } from "../../components/common/layoutComponents/Loading";

import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


interface ISummaryData {
  total_commissions: number;
  total_commissions_formated: string;
  total_commissions_pending: number;
  total_commissions_pending_formated: string;
  total_referred_users: number;
}

interface IUnpaidUserData {
  full_name: string;
  legal_full_name: string;

  customer_id: number;
  email: string;
  order_id: number;

  paid_transactions: number;
  total_transactions: number;

  // YES. these are strings because it is returned that way
  //  from DB...
  paid_transaction_amount: string;
  total_transaction_amount: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [copiedReferralCode, setCopiedReferralCode] = useState(false);
  const [requesting, setRequesting] = useState(false);

  const {
    data: userData,
    error: userError,
    isValidating: isValidatingUserData,
    mutate: mutateUserData,
  } = useSWR<{ data: ICustomerData }, IErrorProps>("/api/customer/current", fetcher);

  const {
    data: summaryData,
    error: summaryError,
    isValidating: isValidatingSummaryData,
    mutate: mutateSummaryData,
  } = useSWR<{ data: ISummaryData }, IErrorProps>("/api/ambassador/summary", fetcher);

  const {
    data: unpaidUsersData,
    error: unpaidUsersError,
    isValidating: isValidatingUnpaidUsersData,
  } = useSWR<{ data: IUnpaidUserData[] }, IErrorProps>("/api/ambassador/unpaid-users", fetcher);

  useEffect(() => {
    if (copiedReferralCode) {
      setTimeout(() => setCopiedReferralCode(false), 3000);
    }
  }, [copiedReferralCode]);

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

  function copyToClipboard() {
    const copyText = document.getElementById("referralCode").innerText;
    navigator.clipboard.writeText(copyText).then(() => {
      // Alert the user that the action took place.
      // Nobody likes hidden stuff being done under the hood!
      setCopiedReferralCode(true);
      console.log(document.getElementById("referralCode").innerText);
    });
  }

  async function handleRequestPayout() {
    setRequesting(true);

    try {
      const res = await poster('/api/ambassador/request-payout', {});
      await mutateSummaryData();

      if (!res.success) {
        toast(res.message || 'Something went wrong', {
          type: 'error',
        });
      } else {
        toast('Payout requested', {
          type: 'success',
        });
      }
    }
    catch (e) {
      console.log(e)
    }

    setRequesting(false);
  }

  const timeOfDay = new Date().getHours();
  const greeting = timeOfDay < 12 ? "morning" : timeOfDay > 18 ? "evening" : "afternoon";

  return (
    <Layout title="Dashboard" contentClassname="py-0 overflow-x-auto">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="font-light text-gray-detail">
            Good {greeting} {(userData.data?.name.trim() || userData.data?.legal_full_name) && ","}
          </p>
          <h2 className="flex text-xl font-semibold pl-1">
            {userData.data?.name.trim() || userData.data?.legal_full_name}
          </h2>
        </div>

        <div>
          <p>Referral code:</p>
          <div>
            <span className="text-primary font-bold text-lg mr-2" id="referralCode">
              {userData.data?.ambassador_referral_code}
            </span>
            <button onClick={() => copyToClipboard()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.90625 3.25C7.54381 3.25 7.25 3.54381 7.25 3.90625V6.2158C7.25 6.63001 6.91421 6.9658 6.5 6.9658C6.08579 6.9658 5.75 6.63001 5.75 6.2158V3.90625C5.75 2.71539 6.71539 1.75 7.90625 1.75H20.0938C21.2846 1.75 22.25 2.71539 22.25 3.90625V16.0938C22.25 17.2846 21.2846 18.25 20.0938 18.25H17.7582C17.3439 18.25 17.0082 17.9142 17.0082 17.5C17.0082 17.0858 17.3439 16.75 17.7582 16.75H20.0938C20.4562 16.75 20.75 16.4562 20.75 16.0938V3.90625C20.75 3.54381 20.4562 3.25 20.0938 3.25H7.90625Z"
                  fill={copiedReferralCode ? "#2A9159" : "#1C1B1E"}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.75 7.90625C1.75 6.71539 2.71539 5.75 3.90625 5.75H16.0938C17.2846 5.75 18.25 6.71539 18.25 7.90625V20.0938C18.25 21.2846 17.2846 22.25 16.0938 22.25H3.90625C2.71539 22.25 1.75 21.2846 1.75 20.0938V7.90625ZM3.90625 7.25C3.54381 7.25 3.25 7.54381 3.25 7.90625V20.0938C3.25 20.4562 3.54381 20.75 3.90625 20.75H16.0938C16.4562 20.75 16.75 20.4562 16.75 20.0938V7.90625C16.75 7.54381 16.4562 7.25 16.0938 7.25H3.90625Z"
                  fill={copiedReferralCode ? "#2A9159" : "#1C1B1E"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="relative mb-0 rounded-t-lg bg-gradient-to-r from-[#8C75FF] to-[#B9C4FF] text-white ">
        <div className="z-10 p-4 h-full w-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url("/wave.png")` }}>
          <p className="block font-semibold">Total referred users: </p>
          <h3 className="block text-lg font-bold leading-tight">{summaryData?.data.total_referred_users ?? "--"}</h3>

          <p className="block font-semibold mt-4">Total transactions subject to commission:</p>
          <h3 className="block text-lg font-bold leading-tight">
            {summaryData?.data.total_commissions_pending_formated ?? "--"}
          </h3>

          <button className={`mt-4 z-40 bg-white bg-opacity-20 px-2 py-1 rounded ${summaryData?.data.total_commissions_pending === 0 ? 'cursor-not-allowed' : 'hover:bg-opacity-30'}`} onClick={handleRequestPayout} disabled={requesting || summaryData?.data.total_commissions_pending === 0}>
            Request Payout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-gray-200 mb-4 bg-white py-6">
        <Link href="/dashboard/payment-tracing">
          <a className="flex flex-col items-center cursor-pointer no-underline">
            <TransactionIconColored className="h-6 w-6" />
            <p className="text-xs text-gray-500 pt-1">Payment tracing</p>
          </a>
        </Link>

        <Link href="/">
          <a className="flex flex-col items-center cursor-pointer no-underline">
            <TransactionIconColored className="h-6 w-6" />
            <p className="text-xs text-gray-500 pt-1">Uncompleted</p>
          </a>
        </Link>
      </div>

      <h3 className="font-bold">Due transactions overview</h3>
      <ul role="list" className="divide-y divide-gray-200">
        {unpaidUsersData?.data.map((row) => (
          <li key={row.customer_id}>
            <div className="py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <Link href={`/dashboard/user/${row.customer_id}`}>
                  <a className="font-medium text-primary truncate underline">{row.full_name || row.legal_full_name}</a>
                </Link>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 rounded-full bg-green-100 text-green-800">
                    Transactions paid/total:{" "}
                    <span className="font-bold ml-2">
                      {row.paid_transactions}/{row.total_transactions}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-gray-500">{row.email}</p>
                  <p className="mt-2 flex items-center text-gray-500 sm:mt-0 sm:ml-6">
                    Unpaid amount:{" "}
                    <span className="font-semibold ml-2 text-gray-detail">
                      {parseFloat(row.total_transaction_amount || "0") - parseFloat(row.paid_transaction_amount || "0")}
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
