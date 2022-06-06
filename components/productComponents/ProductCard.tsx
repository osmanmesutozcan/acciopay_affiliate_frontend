import Link from "next/link";
import { Image } from "../common/Image";
import { IProductDetail } from "../../utils/schema";
import Skeleton from "@mui/material/Skeleton";

export function ProductCard({ product }: { product: IProductDetail }) {
  return product ? (
    <Link
      href={`/product/${product.id}-${product.more_information.find((info) => info.code === "brand").value}-${
        product.url_key
      }`}
    >
      <a className="min-w-32 w-full">
        <Image
          src={product.base_image.medium_image_url}
          alt={product.name}
          divClassName="h-40 w-full"
          objectFit="contain"
        />
        <div className="mt-2 h-full">
          <p className="">{product.name}</p>

          {product.type === "configurable" ? (
            <p className="text-right text-gray-paragraph text-3xs">
              From <span className="font-bold text-base text-black">{product.formated_price}</span>/mo
            </p>
          ) : (
            <p className="text-right text-gray-paragraph text-3xs">
              <span className="font-bold text-base text-black">{product.formated_price}</span>/mo
            </p>
          )}
        </div>
      </a>
    </Link>
  ) : (
    <Skeleton variant="rectangular" height={350} />
  );
}
