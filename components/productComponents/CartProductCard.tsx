import Link from "next/link";
import { useRef, useState } from "react";
import debounce from "lodash/debounce";

import { Alert } from "../common/Modal";
import { Image } from "../common/Image";
import { Select } from "../common/Select";
import { Quantity } from "../common/Quantity";
import { PrimaryButton, SecondaryButton } from "../common/Button";

import { ICartItem } from "../../utils/schema";
import { dangerColor, monthsOptions } from "../../utils/config";
import { poster } from "../../utils/fetcher";
import Skeleton from "@mui/material/Skeleton";
import { twMerge } from "tailwind-merge";
import { DeleteIcon } from "../common/iconComponents/DeleteIcon";

export function CartProductCard({
  item,
  mutateCart,
  setItemCheckState,
}: {
  item: ICartItem;
  mutateCart?: () => void;
  setItemCheckState: (checked: boolean) => void;
}) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [installments, setInstallments] = useState(item.installments_preferred);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const variantOptions = item.product.variants.map((v) => {
    const attributesMap = item.product.super_attributes.flatMap((sa) => sa.options);

    return {
      id: v.id,
      option: v.id,
      label: Object.values(v.map)
        .map((sa) => attributesMap.find((a) => a.id === sa).label)
        .join(" / "),
    };
  });

  const [variant, setVariant] = useState(
    variantOptions.find((v) => String(item.child?.product.id || item.product.id) === String(v.option))?.option
  );

  const handleUpdateVariantDebounced = useRef(
    debounce(async (item: any, variant: any) => {
      await poster("/api/checkout/cart/variant/" + item.id, {
        quantity: item.quantity,
        product_id: item.product.id,
        selected_configurable_option: variant,
        installments_preferred: item.installments_preferred,
      });

      await mutateCart();
    }, 500)
  );

  const handleUpdateQuantityDebounced = useRef(
    debounce(async (quantity: number, installments: number) => {
      await poster("/api/checkout/cart/add/" + item.product.id, {
        quantity,
        product_id: item.product.id,
        selected_configurable_option: item.child?.product.id || item.product.id,
        installments_preferred: installments,
      });

      await mutateCart();
    }, 500)
  );

  async function handleUpdate(quantity: number, installments: number) {
    setQuantity(quantity);

    setInstallments(installments);

    return handleUpdateQuantityDebounced.current(quantity, installments);
  }

  async function handleUpdateVariant(item: any, variant: any) {
    setVariant(variant);

    return handleUpdateVariantDebounced.current(item, variant);
  }

  async function handleRemoveItem() {
    await poster(`/api/checkout/cart/remove/${item.id}`, {}, undefined, "DELETE");
    await mutateCart();
    return setOpenDeleteModal(false);
  }

  return (
    <div className="flex w-full py-4" key={`${item?.name}-${item?.id}`}>
      <div className="w-10">
        <input type="checkbox" onChange={(e) => setItemCheckState(e.target.checked)} />
      </div>
      <div className="flex flex-col w-full space-y-2">
        <div className="flex space-x-2">
          <Link
            href={`/product/${item?.product.id}-${
              item.product.more_information.find((info) => info.code === "brand").value
            }-${item.product.url_key}`}
          >
            <a>
              <Image src={item.product.base_image.medium_image_url} alt={item.name} divClassName="h-20 w-20" />
            </a>
          </Link>

          <div className="flex-1 space-y-1">
            <h2 className={twMerge("font-bold text-xs -mb-3", item.is_invalid && "text-gray-text")}>
              {item.product.name}
            </h2>
            {!item.is_invalid && (
              <>
                {item.product.variants ? (
                  <Select
                    options={variantOptions}
                    selected={variant}
                    setSelected={(v) => handleUpdateVariant(item, v)}
                    width="w-full"
                    height="h-6"
                  />
                ) : (
                  <p>{variantOptions.find((current) => current.option === variant).label}</p>
                )}
                <h3 className="font-bold text-xs">Payment</h3>
                <div className="flex items-center">
                  <Select
                    options={monthsOptions}
                    selected={installments}
                    setSelected={(i) => handleUpdate(quantity, i as number)}
                    maxAllowed={item.installments_max_allowed}
                  />
                  <span className="text-xs ml-1 text-gray-800 leading-tight">
                    {item.installments_preferred === 1
                      ? "Single payment"
                      : <>{item.installments_preferred} equal monthly <br/> payments</>}
                  </span>
                </div>
              </>
            )}

            {item.is_invalid && <p className="text-forbid">Not available</p>}
          </div>
        </div>

        {item.is_invalid ? (
          <div className="flex items-center justify-end">
            <button className="flex items-center justify-center h-5 w-5 bg-center" onClick={handleRemoveItem}>
              <DeleteIcon className="h-5 w-5" color={dangerColor} />
              Delete
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <p className="text-base font-bold">
              {item.formated_monthly_total}
              <span className="text-xs font-normal">/mo</span>
            </p>

            <Quantity
              quantity={quantity}
              onClickDelete={() => setOpenDeleteModal(true)}
              setQuantity={(q) => handleUpdate(q, installments)}
            />
          </div>
        )}
      </div>

      <Alert
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        text={`Are you sure to remove ${item.name} from shopping bag?`}
        button={
          <div className="flex items-center space-x-2">
            <PrimaryButton onClick={() => handleRemoveItem()}>Remove</PrimaryButton>
            <SecondaryButton onClick={() => setOpenDeleteModal(false)}>Cancel</SecondaryButton>
          </div>
        }
      />
    </div>
  );
}

export function CartProductCardSkeleton() {
  return (
    <div className="flex w-full py-4">
      <div className="w-10">
        <input type="checkbox" />
      </div>
      <div className="flex flex-col w-full space-y-2">
        <div className="flex space-x-2">
          <Skeleton variant="rectangular" height={80} width={80} />
          <div className="flex-1 space-y-1">
            <Skeleton variant="text" />
            <Skeleton variant="rectangular" height={20} />
            <Skeleton variant="rectangular" height={50} width={200} />
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <Skeleton variant="rectangular" width={100} height={24} />
          <Skeleton variant="rectangular" width={100} height={24} />
        </div>
      </div>
    </div>
  );
}
