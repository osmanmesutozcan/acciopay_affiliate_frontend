import React, { useState } from "react";
import { useRouter } from "next/router";
import { isEqual } from "lodash";
import { Field, Form, Formik } from "formik";
import Drawer from "@mui/material/Drawer";
import Skeleton from "@mui/material/Skeleton";

import { RightIcon } from "../../common/iconComponents/RightArrowIcon";
import { CloseIcon } from "../../common/iconComponents/CloseIcon";
import { PrimaryButton, SecondaryButton } from "../../common/Button";

import { fetcher, poster } from "../../../utils/fetcher";
import { IAddressData, ICustomerData } from "../../../utils/schema";
import { Loading, LoadingInline } from "../../common/layoutComponents/Loading";
import useSWR from "swr";
import { Error, IErrorProps } from "../../common/layoutComponents/Error";
import { Layout } from "../../common/layoutComponents/Layout";
import qs from "query-string";

interface ICheckoutAddressDetailsProps {
  userData: ICustomerData;
  allAddresses?: IAddressData[];
  billingAddress: IAddressData;
  shippingAddress: IAddressData;
  mutateCart?: () => void;
}

type editingAddressType = "shipping" | "billing";

export function CheckoutAddressDetails({
  userData,
  shippingAddress,
  billingAddress,
  mutateCart,
}: ICheckoutAddressDetailsProps) {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editing, setEditing] = useState<editingAddressType>(null);
  return (
    <div className="space-y-4 my-6">
      <div id="checkout-shipping-info">
        <h2 className="font-bold mb-2">Shipping</h2>
        {userData && shippingAddress ? (
          <div className="flex items-center justify-between text-xs font-light">
            <div>
              <h3 className="font-bold mb-2">{shippingAddress?.first_name}</h3>
              <p>{userData?.email}</p>
              <p>{shippingAddress?.phone}</p>
              <p>
                {shippingAddress?.address1.join(", ")}, {shippingAddress?.postcode}
              </p>
            </div>
            {router.pathname === "/checkout/shipping" && (
              <button
                onClick={() => {
                  setEditing("shipping");
                  setOpenDrawer(true);
                }}
              >
                <RightIcon className="" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex-1">
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </div>
        )}
      </div>

      <div id="checkout-billing-info">
        <h2 className="font-bold mb-2">Billing</h2>
        {userData && billingAddress ? (
          <div className="flex items-center justify-between text-xs font-light">
            <div>
              <h3 className="font-bold mb-2">{billingAddress?.first_name}</h3>
              <p>{userData?.email}</p>
              <p>{billingAddress?.phone}</p>
              <p>
                {billingAddress?.address1.join(", ")}, {billingAddress?.postcode}
              </p>
            </div>
            {router.pathname === "/checkout/shipping" && (
              <button
                onClick={() => {
                  setEditing("billing");
                  setOpenDrawer(true);
                }}
              >
                <RightIcon className="" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex-1">
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </div>
        )}
      </div>
      {router.pathname === "/checkout/shipping" && (
        <ChooseAddressesDrawer
          open={openDrawer}
          setOpen={setOpenDrawer}
          editing={editing}
          setEditing={setEditing}
          current={editing === "shipping" ? shippingAddress : billingAddress}
          other={editing === "shipping" ? billingAddress : shippingAddress}
          email={userData?.email}
          mutateCart={mutateCart}
        />
      )}
    </div>
  );
}

interface IChooseAddressesDrawerProps {
  editing: editingAddressType;
  setEditing: (editingAddressType) => void;
  open: boolean;
  setOpen: (boolean) => void;
  current: IAddressData;
  other: IAddressData;
  email: string;
  mutateCart: () => void;
}

function ChooseAddressesDrawer({
  editing,
  current,
  other,
  open,
  setOpen,
  email,
  mutateCart,
}: IChooseAddressesDrawerProps) {
  const router = useRouter();
  const { data: allAddresses, error: addressesDataError } = useSWR<{ data: IAddressData[] }, IErrorProps>(
    `/api/addresses`,
    fetcher
  );

  if (addressesDataError) {
    return <Error info={addressesDataError.info} status={addressesDataError.status} />;
  }

  if (!allAddresses && !current) {
    return <Loading />;
  }

  async function handleSubmitAddress(values) {
    const parsed = qs.parse(values.addressId);

    const saveAddressRes = await poster("/api/checkout/save-address", {
      shipping:
        editing === "shipping"
          ? {
              ...allAddresses?.data.find(
                (ad) =>
                  isEqual(parsed.address1, ad.address1.join("; ")) &&
                  isEqual(parsed.first_name, ad.first_name) &&
                  isEqual(parsed.phone, ad.phone.slice(1))
              ),
              email: email,
              save_as_address: false,
              use_for_shipping: true,
            }
          : { ...other, email: email, save_as_address: false },
      billing:
        editing === "billing"
          ? {
              ...allAddresses?.data.find(
                (ad) =>
                  isEqual(parsed.address1, ad.address1.join("; ")) &&
                  isEqual(parsed.first_name, ad.first_name) &&
                  isEqual(parsed.phone.slice(1), ad.phone.slice(1))
              ),
              email: email,
            }
          : { ...other, email: email },
    });
    if (saveAddressRes.data) {
      await mutateCart();
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "addresses",
          JSON.stringify({
            billing: saveAddressRes.data.cart.billing_address,
            shipping: saveAddressRes.data.cart.shipping_address,
          })
        );
      }
      setOpen(false);
    }
  }

  return (
    <Drawer className="big-paper" anchor={"right"} open={open} onClose={(e) => setOpen(false)}>
      <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
        <div className="px-4 sm:px-6">
          <div className="flex relative items-start justify-between">
            <div className="flex h-7 items-center relative">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close panel</span>
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            <h3 className="absolute left-1/2 transform -translate-x-1/2 text-gray-900 font-bold w-fit">
              {editing === "shipping" ? "Select shipping address" : "Select billing address"}
            </h3>

            <div />
          </div>
        </div>
        <div className="relative mt-6 flex-1 px-4 sm:px-6">
          <div className="absolute inset-0 px-4 sm:px-6">
            <Formik
              initialValues={{
                addressId: `first_name=${current?.first_name}&phone=${current?.phone.slice(
                  1
                )}&address1=${current?.address1.join("; ")}`,
              }}
              onSubmit={handleSubmitAddress}
            >
              {({ values, handleChange, isSubmitting, isValidating }) => (
                <Form className="flex flex-col space-y-4">
                  <div className="flex flex-col divide-y" role="group">
                    {allAddresses?.data.map((address) =>
                      current && allAddresses ? (
                        <label htmlFor="addressId" key={address.id} className="flex pt-2 my-2 items-center font-light">
                          <Field
                            key={address.id}
                            type="radio"
                            name="addressId"
                            onChange={handleChange}
                            value={`first_name=${address.first_name}&phone=${address.phone.slice(
                              1
                            )}&address1=${address.address1.join("; ")}`}
                            checked={allAddresses.data.find(
                              (ad) =>
                                isEqual(values.addressId.address1, ad.address1.join("; ")) &&
                                isEqual(values.addressId.first_name, ad.first_name) &&
                                isEqual(values.addressId.phone, ad.phone.slice(1))
                            )}
                            className="mr-4 checked:text-primary checked:bg-primary"
                          />
                          <div>
                            <h3 className="font-bold mb-2">{address?.first_name || "N/A"}</h3>
                            <p>{address?.phone}</p>
                            <p>
                              {address?.address1.join("; ")}, {address?.postcode}
                            </p>
                          </div>
                        </label>
                      ) : (
                        <div className="flex-1">
                          <Skeleton variant="text" />
                          <Skeleton variant="text" />
                          <Skeleton variant="text" />
                          <Skeleton variant="text" />
                        </div>
                      )
                    )}
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <PrimaryButton type="submit" className="flex-1" disabled={isValidating || isSubmitting}>
                      {(isValidating || isSubmitting) && <LoadingInline color="#fff" className="mr-2" />}
                      Submit
                    </PrimaryButton>
                    <SecondaryButton
                      onClick={() => router.push(`/checkout/address?addressFor=${editing}`)}
                      className="flex-1"
                    >
                      New address
                    </SecondaryButton>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
