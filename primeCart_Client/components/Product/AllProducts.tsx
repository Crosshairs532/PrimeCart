"use client";

import { useAllProducts } from "@/hooks/Products/useAllproducts";
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  const { data: products, isFetching, isError } = useAllProducts(undefined);

  return (
    <div className=" space-y-4">
      <h1 className=" font-bold text-[2vw]">All Products</h1>
      {isFetching ? (
        <div>
          <p>loading...</p>
        </div>
      ) : products?.length > 0 ? (
        <div>
          {products?.map((product: any, idx: number) => (
            <ProductCard
              key={idx}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              images={product.images}
            />
          ))}
        </div>
      ) : (
        "No products to show"
      )}
    </div>
  );
};

export default AllProducts;
