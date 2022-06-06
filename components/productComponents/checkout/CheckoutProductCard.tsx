import Skeleton from "@mui/material/Skeleton";

import { Image } from "../../common/Image";
import { ICartItem, IOrderItemData } from "../../../utils/schema";

export function CheckoutProductCard({ item, price }: { item: ICartItem | IOrderItemData; price?: string }) {
  const selectedVariant = item?.product.variants.find(
    (variant) => variant.id === item.additional.selected_configurable_option
  );
  const attributesMap = item?.product.super_attributes.flatMap((sa) => sa.options);

  const selectedVariantName =
    selectedVariant &&
    Object.values(selectedVariant.map)
      .map((sa) => attributesMap.find((a) => a.id === sa).label)
      .join(" / ");

  return item ? (
    <div className="flex w-full py-4 space-x-2">
      <Image src={item.product.base_image.medium_image_url} alt={item.name} divClassName="h-20 w-20" />

      <div className="flex-1 space-y-1 text-xs">
        <h2 className="font-bold ">{item.name}</h2>
        <p>{selectedVariantName}</p>

        <p className="text-gray-800 leading-tight">
          {item.installments_preferred === 1
            ? "Single payment"
            : `${item.installments_preferred} equal monthly payment`}
        </p>

        <p className="text-base text-right font-bold justify-self-end">
          {price ? price : item.formated_monthly_total}
          <span className="text-xs font-normal">/mo</span>
        </p>
      </div>
    </div>
  ) : (
    <div className="flex w-full py-4 space-x-2">
      <Skeleton variant="rectangular" width={80} height={80} />

      <div className="flex-1 space-y-1 text-xs">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />

        <p className="text-base text-right font-bold justify-self-end">
          <Skeleton variant="text" />
        </p>
      </div>
    </div>
  );
}

export function CheckoutProductCardSkeleton() {
  return;
}
