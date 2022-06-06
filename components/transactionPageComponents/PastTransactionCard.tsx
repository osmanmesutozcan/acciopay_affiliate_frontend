import { IOrderItemData, IProductDetail } from "../../utils/schema";
import format from "date-fns/format";
import Link from "next/link";
import { Image } from "../common/Image";
import { twMerge } from "tailwind-merge";

export function PastTransactionCard({ item }: { item: IOrderItemData }) {
  const product: IProductDetail & { brand: string } = item.product as any;

  return (
    <div className="flex w-full py-2" key={`${item?.name}-${item?.id}`}>
      <div className="flex flex-col w-full space-y-2">
        <div className="flex space-x-2">
          <Link href={`/product/${product.id}-${product.brand}-${item.product.url_key}`}>
            <a>
              <Image src={item.product.base_image.medium_image_url} alt={item.name} divClassName="h-10 w-10" />
            </a>
          </Link>

          <div className="flex-1 flex flex-col justify-between">
            <Link href={`/product/${product.id}-${product.brand}-${item.product.url_key}`}>
              <a>
                <h2 className={twMerge("font-bold text-xs ")}>{item.name}</h2>
              </a>
            </Link>

            <p>
              Payments completed
              {/*<span className="text-primary">2/12</span>*/}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
