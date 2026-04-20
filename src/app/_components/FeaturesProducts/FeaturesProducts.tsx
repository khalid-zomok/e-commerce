import { getAllProducts } from "@/api/services/routemisr.service";
import React from "react";
import ProductCard from './../ProductCard/ProductCard';

export default async function FeaturesProducts() {
 

  const allProducts = await getAllProducts();


  return (
    <>

      <div className="flex px-2 flex-wrap mx-auto my-2">
        {allProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
