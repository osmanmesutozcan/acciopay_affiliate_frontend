import { PrimaryButton } from "../../components/common/Button";
import VerificationInput from "react-verification-input";
import { fetcher, poster } from "../../utils/fetcher";
import cookieCutter from "cookie-cutter";
import { Loading } from "../../components/common/layoutComponents/Loading";
import { useRouter } from "next/router";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { getUserToken, setUserToken } from "../../utils/userToken";
import { AccioPayLogo } from "../../components/common/iconComponents/AccioPayLogo";
import useSWR from "swr";
import { red } from "@mui/material/colors";
import { poll } from "../../utils/poll";
import { ICustomerData } from "../../utils/schema";

export default function VerifyPhone() {
  const router = useRouter();
  const { phone = "", redirect = "" } = router.query;

  const [code, setCode] = useState("");
  const [verificationError, setVerificationError] = useState(false);
  const { data, mutate } = useSWR<{ data: ICustomerData }>("/api/customer/current", fetcher);

  async function resendVerificationCode() {
    setCode("");
    setVerificationError(false);
    await poster("/api/customer/verification-send", {
      phone: `+${phone}`,
    });
    setCode("");
  }

  async function handleVerify() {
    try {
      let data: ICustomerData | null = null;
      const response = await poster<{ token: string }>("/api/customer/verification-validate", {
        phone: `+${phone}`,
        code,
      });

      if (response.token) {
        setUserToken(response.token);
        await poll(
          () => getUserToken(),
          (t) => !!t,
          250
        );
        // refresh the user before steps completed check.

        data = (await mutate())?.data;
      }

      if (data?.ambassador_verification === "approved") {
        return router.replace("/dashboard");
      } else {
        setVerificationError(true);
        return;
      }

      // Unreachable until we decide if we want verification here.


      const alreadyCompleted = data?.verification_steps_completed ?? [];

      if (redirect) {
        return router.replace(redirect as string);
      }

      if (!alreadyCompleted.includes("singpass")) {
        return router.replace("/verification/singpass");
      }

      if (!alreadyCompleted.includes("upload")) {
        return router.replace("/verification/upload");
      }

      if (!alreadyCompleted.includes("email")) {
        return router.replace("/verification/email");
      }

      if (!alreadyCompleted.includes("identity")) {
        return router.replace("/verification/identity");
      }

      return router.replace("/");

      //
    } catch (e) {
      setVerificationError(true);
      console.log(e);
    }
  }

  return (
    <div className="p-4 text-center ">
      <AccioPayLogo className="w-full" />
      <div className="my-20">
        <h1 className="text-xl font-bold mb-4">Enter OTP</h1>
        <p className="text-gray-paragraph w-72 mx-auto">Please enter the 4 digit code sent to +{phone} through SMS</p>
        <VerificationInput
          value={code}
          length={4}
          placeholder={""}
          removeDefaultStyles
          inputProps={{ inputMode: "numeric" }}
          classNames={{
            container: "w-fit h-[50px] mx-auto my-6",
            character: twMerge(
              "flex items-center justify-center w-[50px] rounded-sm border mx-3 text-xl font-light",
              verificationError ? "border-danger-text text-danger-text" : " border-black"
            ),
            characterInactive: "character--inactive",
            characterSelected: "character--selected ring-1 ring-black",
          }}
          onChange={(val) => {
            setVerificationError(false);
            setCode(val);
          }}
        />

        <p>
          {verificationError ? (
            <span className="text-danger-text">Invalid code. Please try again. </span>
          ) : (
            <span>Didn’t receive a code? </span>
          )}

          <button className="font-bold underline" onClick={() => resendVerificationCode()}>
            Resend SMS
          </button>
        </p>
        <PrimaryButton className="w-full mt-6" onClick={handleVerify}>
          Verify
        </PrimaryButton>
      </div>
    </div>
  );
}
