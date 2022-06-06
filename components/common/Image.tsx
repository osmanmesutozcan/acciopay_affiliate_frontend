import NextImage from "next/image";
import { twMerge } from "tailwind-merge";
import { ImageLoader, ImageLoaderProps } from "next/dist/client/image";

const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `/image.svg`;
};

interface IImageProps {
  src: string;
  alt: string;
  className?: string;
  divClassName?: string;
  ariaHidden?: string;
  objectFit?: any;
}

export function Image({
  src,
  alt,
  className,
  divClassName,
  ariaHidden,
  objectFit,
}: IImageProps) {
  return (
    <div className={twMerge("relative", divClassName)}>
      <NextImage
        // loader={myLoader}
        src={src}
        alt={alt}
        layout="fill"
        placeholder="blur"
        blurDataURL="/image.svg"
        objectFit={objectFit}
        className={twMerge("", className)}
      />
    </div>
  );
}
