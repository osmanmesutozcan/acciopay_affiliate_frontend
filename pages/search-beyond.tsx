import { Layout } from "../components/common/layoutComponents/Layout";
import { Search } from "../components/common/Search";
import { twMerge } from "tailwind-merge";
import { StyledSlider } from "../components/common/Slider";
import { Field, Form, Formik, FieldProps } from "formik";
import { textInputClasses } from "../components/common/Input";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { IProductDetail } from "../utils/schema";
import { IErrorProps } from "../components/common/layoutComponents/Error";
import qs from "query-string";
import { fetcher, poster } from "../utils/fetcher";
import { ProductCard } from "../components/productComponents/ProductCard";
import Skeleton from "@mui/material/Skeleton";
import { PrimaryButton } from "../components/common/Button";
import { LoadingInline } from "../components/common/layoutComponents/Loading";
import { accioPayEmail } from "../utils/config";
import { SmileIcon, SquintIcon } from "../components/common/iconComponents/EmojiIcon";

export default function SearchBeyond() {
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

  const { data: fakeYouMayLike, error: fakeYouMayLikeError } = useSWR<{ data: IProductDetail[] }, IErrorProps>(
    `/api/products?${qs.stringify({
      category_id: 2,
      with_attributes: true,
    })}`,
    fetcher
  );

  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => setShowSuccess(false), 4000);
    }
    if (showFail) {
      setTimeout(() => setShowFail(false), 4000);
    }
  }, [showSuccess, showFail]);

  if (fakeYouMayLikeError) {
    console.log(fakeYouMayLikeError);
  }

  async function handleSubmit(values, { resetForm }) {
    try {
      const resp = await poster("/api/search-beyond", { ...values });
      resetForm();

      return setShowSuccess(true);
    } catch (err) {
      setShowFail(true);
      console.log(err);
    }
  }
  return (
    <Layout contentClassname="py-0">
      <div>
        <Formik
          initialValues={{
            url: "",
            item_amount: 0,
            preferred_installment: 6,
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, isSubmitting, isValidating, setFieldValue, touched }) => (
            <Form className="flex flex-col space-y-3">
              <div>
                <label htmlFor="url" className="font-bold mb-3 ">
                  Copy paste product link from any store
                </label>
                <p className="text-gray-text mb-2">(min. purchase value S$2000)</p>
                <Field name="url" type="url" className={twMerge(textInputClasses, "h-9")} placeholder="https://..." />
                <p className="text-3xs mt-1">
                  The review process will take about 1-3 working days. We will notify you of the results through email.
                </p>
              </div>
              <div>
                <h2 className="font-bold mb-2">Calculate your monthly payment </h2>
                <label htmlFor="item_amount" className="font-bold text-gray-detail text-xs">
                  Input amount
                </label>
                <Field
                  name="item_amount"
                  type="number"
                  min={0}
                  value={values.item_amount}
                  className={twMerge(textInputClasses, "before:content-['$'] before:ml-0.5 h-9")}
                  placeholder="$2000"
                  // prefix="$"
                  onChange={(e) => {
                    handleChange(e);
                    setMonthlyPayment(Number(e.target.value) / values.preferred_installment);
                  }}
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="preferred_installment" className="font-medium text-gray-700">
                    Tenure
                  </label>
                  <span className="text-xs font-bold text-primary">{values.preferred_installment} months</span>
                </div>

                <StyledSlider
                  name="preferred_installment"
                  min={0}
                  max={24}
                  value={values.preferred_installment}
                  onChange={(e) => {
                    console.log(e);
                    // @ts-ignore
                    setFieldValue("preferred_installment", e.target.value);
                    // @ts-ignore
                    setMonthlyPayment(values.item_amount / e.target.value);
                  }}
                  className="p-0"
                />
                <div className="flex items-center justify-between text-xs text-gray-text">
                  <span>0 months</span>
                  <span>24 months</span>
                </div>
                <div className="flex items-center justify-between font-bold mt-6">
                  <span>Your monthly payment</span>
                  <div>
                    <span className="font-normal mr-1 text-xs text-gray-text">S$</span>
                    <span className="text-xl">{Math.ceil(monthlyPayment)}</span>
                  </div>
                </div>
                <PrimaryButton
                  type="submit"
                  disabled={isSubmitting || values.url === "" || [null, 0, undefined, ""].includes(values.item_amount)}
                  className="w-full mt-10"
                >
                  {isSubmitting && <LoadingInline color="#fff" className="mr-2" />}Submit
                </PrimaryButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {fakeYouMayLike ? (
        <div className="mt-8">
          <h2 className="font-bold">You may like</h2>

          <div id="products" className="carousel space-x-4 my-4 w-32">
            {fakeYouMayLike?.data?.map((product, idx) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <Skeleton />
          <div className="flex items-center my-4 space-x-4">
            <Skeleton variant="rectangular" width={128} height={210} />
            <Skeleton variant="rectangular" width={128} height={210} />
          </div>
        </div>
      )}
      {showSuccess && (
        <div className="absolute inset-1/2 -translate-x-2/4 -translate-y-2/4 w-60 h-40 bg-black opacity-60 flex flex-col items-center text-white p-4 text-center space-y-2">
          <SmileIcon />
          <h3 className="font-bold">Successfully submitted!</h3>
          <p>The review process will take about 1-3 working days. We will notify you of the results through email.</p>
        </div>
      )}
      {showFail && (
        <div className="absolute inset-1/2 -translate-x-2/4 -translate-y-2/4 w-60 h-40 bg-black opacity-60 flex flex-col items-center text-white p-4 text-center space-y-2">
          <SquintIcon color="white" />
          <h3 className="font-bold">Sorry</h3>
          <p>
            Sorry, we are unable to process your request at this moment. You may wish to try again at a later time or
            email us at {accioPayEmail.hello} for urgent assistance.
          </p>
        </div>
      )}
    </Layout>
  );
}
