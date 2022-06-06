import { Dispatch } from "react";
import { useRouter } from "next/router";
import { DeleteIcon } from "./iconComponents/DeleteIcon";
import { dangerColor } from "../../utils/config";

interface IQuantityProps {
  quantity: number;
  setQuantity: (number) => void;
  onClickDelete?: () => void;
}

export function Quantity({ quantity, setQuantity, onClickDelete }: IQuantityProps) {
  const router = useRouter();

  function decreaseButton() {
    if (router.asPath === "/shopping-cart" && quantity === 1) {
      return (
        <button className="flex items-center justify-center h-5 w-5 bg-center" onClick={onClickDelete}>
          <DeleteIcon className="h-5 w-5" color={dangerColor} />
        </button>
      );
    } else {
      return (
        <button
          className="flex items-center justify-center h-5 w-5 bg-center"
          style={{ backgroundImage: `url('/minus.svg')` }}
          onClick={() => {
            if (quantity === 1) return;
            setQuantity(quantity - 1);
          }}
          disabled={quantity === 1}
        />
      );
    }
  }
  return (
    <div className="flex items-center justify-between w-20">
      {decreaseButton()}
      <span>{quantity}</span>
      <button
        className="flex items-center justify-center h-5 w-5 bg-center "
        style={{ backgroundImage: `url('/plus.svg')` }}
        onClick={() => setQuantity(quantity + 1)}
      />
    </div>
  );
}
