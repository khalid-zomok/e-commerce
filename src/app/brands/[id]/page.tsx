import {
  getSingleBrand,
  getSingleBrandProducts,
} from "@/api/services/routemisr.service";
import NoProductFound from "@/app/_components/NoProductFound/NoProductFound";
import ProductCard from "@/app/_components/ProductCard/ProductCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFilter, FaTags } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

export default async function SingleBrandpage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const myBrand = await getSingleBrandProducts(id);
  const productBrand = await getSingleBrand(id);
  console.log(myBrand);
  console.log(productBrand);

  return (
    <>
      <div className="w-full h-auto p-12 bg-linear-to-l from-green-500 to-green-600 shadow-sm text-white">
        {/* 1. Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-green-100 mb-6">
          <Breadcrumb>
            <BreadcrumbList className="text-slate-300 text-md">
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-slate-300 hover:text-white"
                  href="/"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              /
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-slate-300 hover:text-white"
                  href="/brand"
                >
                  Brand
                </BreadcrumbLink>
              </BreadcrumbItem>
              /
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  {productBrand?.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* 2. Main Title and Subtitle Area */}
        <div className="flex items-center gap-6">
          {/* Icon Container with subtle white opacity */}
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <Image
              width={30}
              height={30}
              src={productBrand?.image || "...."}
              alt={productBrand?.name || "Brand Logo"}
            />
          </div>

          {/* Text Content */}
          <div>
            <h1 className="text-4xl font-bold leading-tight">
              {productBrand?.name}
            </h1>
            <p className="text-green-100 text-sm mt-2 font-light">
              Choose a subcategory to browse products
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-2 flex-wrap my-4">
        <div className="flex px-3 flex-col gap-4 items-start border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <FaFilter className="text-xl text-slate-700" />
            <span className="text-sm font-semibold text-slate-800">
              Active Filters:
            </span>

            {/* Active Filter Tag */}
            <Link
              href={"/shop"}
              className="flex items-center gap-1.5 bg-violet-50 text-violet-600 hover:bg-violet-200 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide"
            >
              <FaTags className="text-base" />
              {productBrand?.name}
              <IoIosClose className="text-xl" />
            </Link>

            {/* Clear All Link */}
            <Link
              href={"/shop"}
              className="text-lg text-slate-600 hover:text-violet-700 underline"
            >
              Clear all
            </Link>
          </div>

          {/* Product Count */}
          <p className="text-sm font-semibold text-slate-800">
            Showing <span className="text-violet-700">{myBrand?.length}</span>{" "}
            products
          </p>
        </div>
        <div className="flex px-2 flex-wrap">
          {myBrand?.length !== 0 ? (
            myBrand?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <NoProductFound />
          )}
        </div>
      </div>
    </>
  );
}
