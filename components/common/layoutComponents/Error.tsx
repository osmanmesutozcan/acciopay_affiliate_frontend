import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import { Layout } from "./Layout";
import { SquintIcon } from "../iconComponents/EmojiIcon";
import { accioPayEmail } from "../../../utils/config";
import { AmbassadorVerificationStatus } from "../../../utils/schema";
import { Link } from "@mui/material";

export interface IErrorProps {
  info: any;
  status: number;
}

export function Error({ info, status }: IErrorProps) {
  console.log(info, status);
  return (
    <div className="flex justify-around w-full h-full py-10">
      <div className="text-center overflow-auto break-words">
        <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide">{status} error</p>
        <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          {status === 404 ? "Page not found" : info?.message || info?.error || info}
        </h2>
      </div>
    </div>
  );
}

export function SorryError() {
  return (
    <Layout>
      <div className="absolute inset-1/2 -translate-x-2/4 -translate-y-2/4 w-60 h-fit bg-black opacity-60 flex flex-col items-center text-white p-4 text-center space-y-2">
        <div className="inline-block h-6 w-6">
          <SquintIcon className="h-6 w-6" color="#fff" />
        </div>
        <h3 className="font-bold">Sorry</h3>
        <p>
          Sorry, something went wrong. You may wish to try again at a later time or email us at {accioPayEmail.hello}{" "}
          for urgent assistance.
        </p>
      </div>
    </Layout>
  );
}

export function NotAmbassadorError({ ambassadorStatus }: { ambassadorStatus: AmbassadorVerificationStatus }) {
  return (
    <Layout>
      <div className="absolute inset-1/2 -translate-x-2/4 -translate-y-2/4 w-60 h-fit bg-black opacity-60 flex flex-col items-center text-white p-4 text-center space-y-2">
        <div className="inline-block h-6 w-6">
          <SquintIcon className="h-6 w-6" color="#fff" />
        </div>
        <h3 className="font-bold">Sorry</h3>
        <p>
          Your ambassador application status is: <span className="font-bold">{ambassadorStatus}</span>
        </p>
        <p>
          If you have not applied for affiliate programme, please{" "}
          <Link href="/affiliate">
            <a className="underline">click here</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
