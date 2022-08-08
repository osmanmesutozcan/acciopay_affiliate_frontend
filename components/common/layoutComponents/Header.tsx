import { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import Drawer from "@mui/material/Drawer";
import Skeleton from "@mui/material/Skeleton";

import { Error, IErrorProps } from "./Error";

import { fetcher } from "../../../utils/fetcher";
import { deleteUserToken } from "../../../utils/userToken";
import { ICart, ICategoriesResponse, ICustomerData } from "../../../utils/schema";
import { AccioPayLogo } from "../iconComponents/AccioPayLogo";
import { UserIcon } from "../iconComponents/UserIcon";
import { LeftIcon } from "../iconComponents/LeftArrowIcon";
import { BarsIcon } from "../iconComponents/BarsIcon";
import { CloseIcon } from "../iconComponents/CloseIcon";
import { DashboardIcon } from "../iconComponents/DashboardIcon";

interface IHeaderProps {
  back: boolean;
  title?: string;
}

function useData() {
  // prettier-ignore
  const { data: userData, error: userError,isValidating: isValidatingUserData, mutate: mutateUserData } = useSWR<{data: ICustomerData}, IErrorProps>("/api/customer/current", fetcher);

  return {
    userData,
    isValidatingUserData,
    mutateUserData,
    userError,
  };
}

export function Header({ back = false, title }: IHeaderProps) {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  const { userData, userError, isValidatingUserData, mutateUserData } = useData();

  useEffect(() => {
    if (!userData && !isValidatingUserData) {
      deleteUserToken();
    }
  }, [userData, isValidatingUserData]);

  async function handleLogout() {
    try {
      await fetcher("/api/customer/logout");
      await mutateUserData();
      await router.push("/");
    } catch (err) {
      console.log(err);
    }

    deleteUserToken();
  }

  function showMenu() {
    if (back) {
      return (
        <button onClick={() => router.back()}>
          <LeftIcon className="h-6 w-6" />
        </button>
      );
    }
    if (router.asPath === "/privacy-policy" || router.asPath === "/terms-of-use" || router.asPath === "/help") {
      return null;
    } else {
      return (
        <button
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          onClick={() => setOpenDrawer(true)}
        >
          <span className="sr-only">Open main menu</span>
          {openDrawer ? <LeftIcon className="h-6 w-6" /> : <BarsIcon className="h-6 w-6" />}
        </button>
      );
    }
  }

  function showIcons() {
    if (router.asPath === "/privacy-policy" || router.asPath === "/terms-of-use" || router.asPath === "/help") {
      return (
        <button onClick={() => router.back()}>
          <CloseIcon className="h-6 w-6" />
        </button>
      );
    } else {
      return null;
    }
  }

  function showLogo() {
    if (
      router.asPath === "/" ||
      router.pathname === "/[category]" ||
      router.pathname === "/search" ||
      "/checkout/proceed"
    ) {
      return (
        <div className="w-24">
          <AccioPayLogo />
        </div>
      );
    }
  }

  function showUserPaths() {
    if (!userError && !userData) {
      return (
        <>
          <Skeleton variant="rectangular" height={20} />
          <Skeleton variant="rectangular" height={20} />
          <Skeleton variant="rectangular" height={20} />
          <Skeleton variant="rectangular" height={20} />
        </>
      );
    }

    if (userError) {
      return (
        <Link href={"/auth/signup"}>
          <a key="login" className="flex items-center text-base py-2">
            <UserIcon className="h-5 w-5 mr-2" />
            <span className="ml-2">Sign up / Login</span>
          </a>
        </Link>
      );
    }

    if (userData?.data) {
      return (
        <>
          <Link href={"/dashboard"}>
            <a key="dashboard" className="flex items-center text-base py-2 cursor-pointer">
              <DashboardIcon className="h-5 w-5 mr-2" />
              <span className="ml-2">Dashboard</span>
            </a>
          </Link>
          <a key="logout" className="flex items-center text-base py-2 cursor-pointer" onClick={() => handleLogout()}>
            <UserIcon className="h-5 w-5 mr-2" />
            <span className="ml-2">Logout</span>
          </a>
        </>
      );
    }
  }

  return (
    <div className="sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center">{showMenu()}</div>

          <div className="mx-auto font-bold">{title || showLogo()}</div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2">{showIcons()}</div>
        </div>
      </div>

      <Drawer
        anchor={"left"}
        className="small-paper"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onClick={() => setOpenDrawer(false)}
      >
        <div className="px-5 p-2">
          <div className="pt-2 pb-3 w-24">
            <AccioPayLogo />
          </div>

          <div className="pt-2 pb-3 space-y-1 text-base">{showUserPaths()}</div>
        </div>
      </Drawer>
    </div>
  );
}
