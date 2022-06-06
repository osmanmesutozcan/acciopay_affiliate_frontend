import { CheckoutProductCard } from "./CheckoutProductCard";
import Collapse from "@mui/material/Collapse";
import { DownIcon } from "../../common/iconComponents/DownArrowIcon";
import Skeleton from "@mui/material/Skeleton";
import React, { useState } from "react";
import { ICart } from "../../../utils/schema";

interface ICheckoutProductsListProps {
  cartData: ICart;
}

export function CheckoutProductsList({ cartData }: ICheckoutProductsListProps) {
  const [openCollapse, setOpenCollapse] = useState(false);

  return (
    <>
      <div className="divide-y">
        <CheckoutProductCard item={cartData?.cart?.items[0]} />
        <Collapse orientation="vertical" in={openCollapse} className="w-full" classes={{ wrapperInner: "divide-y" }}>
          {cartData?.cart?.items?.slice(1).map((item) => (
            <CheckoutProductCard item={item} key={item?.id} />
          ))}
        </Collapse>
      </div>

      {cartData?.cart?.items?.slice(1)?.length > 0 && (
        <button
          className="flex items-center text-xs text-gray-text underline mx-auto"
          onClick={() => setOpenCollapse(!openCollapse)}
        >
          {openCollapse ? (
            <>
              Collapse <DownIcon className="h-4 w-4 rotate-180" color="#979797" />
            </>
          ) : (
            <>
              And {cartData?.cart.items.slice(1).length} other item <DownIcon className="h-4 w-4" color="#979797" />
            </>
          )}
        </button>
      )}
    </>
  );
}
