import * as Yup from "yup";
import { Form, Field, Formik } from "formik";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { textInputClasses } from "../../components/common/Input";
import { PrimaryButton } from "../../components/common/Button";
import { poster } from "../../utils/fetcher";
import { Alert } from "../../components/common/Modal";
import { AccioPayLogo } from "../../components/common/iconComponents/AccioPayLogo";
import { countryCodeOptions } from "../../utils/config";
import { LoadingInline } from "../../components/common/layoutComponents/Loading";

interface ISignUpFormProps {
  countryPhoneCode: string;
  phoneNumber: string;
  termsAndConditions: boolean;
  newsletter: boolean;
}

const SignUpSchema = Yup.object().shape({
  countryPhoneCode: Yup.string().required(),
  phoneNumber: Yup.string(),
});

export default function SignUp() {
  const router = useRouter();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  return (
    <div className="p-4 h-screen">
      <div className="w-24 mx-auto">
        <AccioPayLogo />
      </div>

      <div className="mt-40 space-y-2 text-center">
        <h1 className="text-xl font-semibold">Shop with Acciopay</h1>
        <h2 className="text-xs text-gray-paragraph">Buy it, split it, card-free</h2>
      </div>

      <Formik
        validationSchema={SignUpSchema}
        initialValues={{
          countryPhoneCode: countryCodeOptions[0].phoneCode,
          phoneNumber: "",
          termsAndConditions: false,
          newsletter: false,
        }}
        onSubmit={async (values: ISignUpFormProps, { setSubmitting }) => {
          if (!values.phoneNumber) {
            setAlertText("Please fill in your phone number.");
            return setOpenAlert(true);
          }

          if (!values.termsAndConditions) {
            setAlertText("Please check the agreement.");
            return setOpenAlert(true);
          }
          try {
            await poster("/api/customer/verification-send", {
              phone: values.countryPhoneCode + values.phoneNumber,
            });
            return router.push(
              `/auth/verify-phone?phone=${values.countryPhoneCode.replace("+", "")}${values.phoneNumber}`
            );
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValidating,

          /* and other goodies */
        }) => (
          <Form className="flex flex-col justify-between h-1/3">
            <div className="flex mt-3">
              <Field
                as="select"
                name="countryPhoneCode"
                onSelect={handleChange}
                className="max-w-lg block w-24 h-10 sm:max-w-xs sm:text-sm border border-black focus:border-black mr-3 rounded-[2px]"
              >
                {countryCodeOptions.map((item) => (
                  <option
                    value={item.phoneCode}
                    key={`${item.code}-${item.countryName}`}
                    defaultValue={countryCodeOptions[0].phoneCode}
                  >
                    {item.phoneCode}
                  </option>
                ))}
              </Field>
              <Field
                type="tel"
                name="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                placeholder="Your phone number"
                className={textInputClasses}
              />
            </div>

            {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber && <span>{errors.phoneNumber}</span>}

            <PrimaryButton type="submit" disabled={isSubmitting || values.phoneNumber === ""} className="w-full mt-6">
              {isSubmitting && <LoadingInline color="#fff" className="mr-2" />}sign up/login
            </PrimaryButton>

            <div className="my-6 w-full">
              <Link href={"/"}>
                <a className="underline text-center block">Skip now. Just browsing.</a>
              </Link>
            </div>

            <div className="flex-1" />

            <div className="text-xs">
              <div className="flex mb-3">
                <Field
                  type="checkbox"
                  name="termsAndConditions"
                  className="h-4 w-4 text-primary border-black rounded-sm mr-2"
                />
                <label htmlFor="termsAndConditions" className="block">
                  I agree to Terms of Service and Privacy policy
                </label>
              </div>

              <div className="flex">
                <Field
                  type="checkbox"
                  name="newsletter"
                  className="h-4 w-4 text-primary border-black rounded-sm mr-2"
                />
                <label htmlFor="newsletter" className="block">
                  I want to receive exclusive offers and promotions from Acciopay
                </label>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Alert
        open={openAlert}
        setOpen={setOpenAlert}
        text={alertText}
        button={
          <PrimaryButton type="button" onClick={() => setOpenAlert(false)} className="w-44">
            Ok
          </PrimaryButton>
        }
      />
    </div>
  );
}
