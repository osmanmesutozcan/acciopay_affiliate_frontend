import Link from "next/link";
import { Image } from "../common/Image";
import { twMerge } from "tailwind-merge";
import { Select } from "../common/Select";
import { dangerColor, monthsOptions } from "../../utils/config";
import { DeleteIcon } from "../common/iconComponents/DeleteIcon";
import { Quantity } from "../common/Quantity";
import { Alert } from "../common/Modal";
import { PrimaryButton, SecondaryButton } from "../common/Button";
import { ICartItem, IOrderData, IOrderItemData, IProductDetail } from "../../utils/schema";
import { capitalize } from "lodash";
import format from "date-fns/format";
import isEqual from "lodash/isEqual";

export function CheckboxUpcomingTransactionCard({
  item,
  orderId,
  paymentMethod,
  setItemCheckState,
  checked,
}: {
  item: IOrderItemData;
  orderId: number;
  paymentMethod: string;
  setItemCheckState: (checked: boolean) => void;
  checked?: boolean;
}) {
  return (
    <div className="flex w-full py-4" key={`${item?.product.name}-${item?.id}`}>
      <div className="w-10">
        <input
          type="checkbox"
          onChange={(e) => {
            setItemCheckState(e.target.checked);
          }}
          checked={checked}
        />
      </div>
      <UpcomingTransactionCard item={item} orderId={orderId} paymentMethod={paymentMethod} />
    </div>
  );
}
export function UpcomingTransactionCard({
  item,
  orderId,
  paymentMethod,
}: {
  item: IOrderItemData;
  orderId: number;
  paymentMethod: string;
}) {
  function getDate(date) {
    return format(new Date(date), "d LLL. y");
  }
  return (
    <Link href={`/account/transactions/${item.id}?orderId=${orderId}&paymentMethod=${paymentMethod}`} passHref>
      <div className="flex flex-col w-full space-y-2">
        <div className="flex space-x-2">
          <Image src={item.product.base_image.medium_image_url} alt={item.product.name} divClassName="h-20 w-20" />

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className={twMerge("font-bold text-xs ")}>{item.product.name}</h2>
              <p>
                Payments completed:{" "}
                <span className="text-primary">
                  {item.invoices.length}/{item.installments_preferred}
                </span>
              </p>
            </div>
            <div>
              <p>Next payment due:</p>
              <div className="flex items-center justify-between h-4 mt-1 font-bold">
                <span>{getDate(item.installment_due_at)}</span>
                <span>{item.invoices.length > 0 ? item.formated_monthly_total : item.formated_initial_total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
