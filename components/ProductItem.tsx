import Image from "next/image";
import React from "react";
import Link from "next/link";
import ProductItemRating from "./ProductItemRating";

const ProductItem = ({
  product,
  color,
}: {
  product: Product;
  color: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={
            product.mainImage
              ? `/${product.mainImage}`
              : "/product_placeholder.jpg"
          }
          width="0"
          height="0"
          sizes="100vw"
          className="w-auto h-[300px]"
          alt={product?.title}
        />
      </Link>
      <Link
        href={`/product/${product.slug}`}
        className={
          color === "black"
            ? `text-xl text-black font-normal mt-2 uppercase`
            : `text-xl text-white font-normal mt-2 uppercase`
        }
      >
        {product.title}
      </Link>
      <p
        className={
          color === "black"
            ? "text-lg text-black font-semibold"
            : "text-lg text-white font-semibold"
        }
      >
        ${product.price}
      </p>

      <ProductItemRating productRating={product?.rating} />
      <Link
        href={`/product/${product?.slug}`}
        className="block flex justify-center items-center w-full uppercase bg-gray-700 px-0 py-2 text-base border border-black border-gray-300 font-bold text-gray-300 shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 
                  transition-transform duration-200 ease-in-out hover:scale-110"
      >
        <p>View product</p>
      </Link>

    </div>
  );
};

export default ProductItem;
