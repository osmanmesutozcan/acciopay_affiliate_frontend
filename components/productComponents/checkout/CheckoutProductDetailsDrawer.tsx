import { Drawer } from "@mui/material";
import { CloseIcon } from "../../common/iconComponents/CloseIcon";
import { ICart } from "../../../utils/schema";
import { Loading } from "../../common/layoutComponents/Loading";

interface ICheckoutProductDetailsDrawerProps {
  cartData: ICart;
  openDetailDrawer: boolean;
  setOpenDetailDrawer: (boolean) => void;
}

export function CheckoutProductDetailsDrawer({
  cartData,
  openDetailDrawer,
  setOpenDetailDrawer,
}: ICheckoutProductDetailsDrawerProps) {
  if (!cartData) {
    return <Loading />;
  }

  return (
    <Drawer
      anchor="bottom"
      open={openDetailDrawer}
      onClose={() => setOpenDetailDrawer(false)}
      PaperProps={{ style: { height: "50%" } }}
    >
      <div className="flex flex-col py-4 px-3 sm:px-6">
        <div className="flex items-start justify-between">
          <div className="w-5 h-5" />
          <span className="font-semibold text-base">Check details</span>
          <button
            type="button"
            className="rounded-md bg-white text-black hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            onClick={() => setOpenDetailDrawer(false)}
          >
            <span className="sr-only">Close panel</span>
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div>
          {cartData?.cart.items.map((item) => (
            <div className="flex items-end justify-between mb-4" key={item.id}>
              <div>
                <h4 className="font-semibold text-xs mb-2">{item.name}</h4>
                <p>
                  {item.installments_preferred === 1
                    ? "Single payment"
                    : `${item.installments_preferred} equal monthly payment`}
                </p>
              </div>
              <span className="font-bold">{item.formated_monthly_total}/mo</span>
            </div>
          ))}

          <div className="text-xs mt-10">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold">Shipping</span>
              <span>{cartData?.cart?.selected_shipping_rate?.formated_price}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold">Voucher Applied</span>
              <span>$0</span>
            </div>
          </div>

          <div className="flex items-center justify-end text-xs mt-10">
            Due now: <span className="text-primary font-bold text-base">{cartData.cart.formated_initial_total}</span>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
