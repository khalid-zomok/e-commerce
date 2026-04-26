import { getSingleProduct } from "@/api/services/routemisr.service";
import CustomTabs from "@/app/_components/CustomTabs/CustomTabs";
import ProductDetailsSlider from "@/app/_components/ProductDetailsSlider/ProductDetailsSlider";
import { Badge } from "@/components/ui/badge";
import {
  FaRegStar,
  FaShareAlt,
  FaShieldAlt,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import {
  FaArrowRotateLeft,
  FaCartShopping,
  FaTruckFast,
} from "react-icons/fa6";
import { MdElectricBolt } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import AddButton from "@/app/_components/AddButton/AddButton";
import { Check } from "lucide-react";
import PlusMinusOperation from "@/app/_components/PlusMinusOperation/PlusMinusOperation";
import AddToWishlistBtn from "@/app/_components/AddToWishlistBtn/AddToWishlistBtn";
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const myProduct = await getSingleProduct(id);
  //
  const separateDecimal = (num: number) => {
    // 1. Get the whole number (the 4)
    const whole = Math.floor(num);

    // 2. Get the decimal part and convert to a whole number (the 3)
    // We use .toFixed(1) to avoid floating point math errors (like 0.30000004)
    const decimalPart = (num - whole).toFixed(1);
    const fractional = Math.round(parseFloat(decimalPart) * 10);

    return { whole, fractional };
  };
  const setRatingStar = (rating: number) => {
    const { whole, fractional } = separateDecimal(rating);
    const emptyStars = 5 - whole - (fractional >= 5 ? 1 : 0);
    return (
      <div className="flex text-yellow-400">
        {[...Array(whole)].map((_, i) => (
          <FaStar key={`full-${i}`} size={20} className="fill-current" />
        ))}

        {fractional >= 5 && (
          <FaStarHalfAlt size={20} className="fill-current" />
        )}

        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} size={20} className="fill-current" />
        ))}
      </div>
    );
  };

  if (!myProduct) {
    return <div className="p-20 text-center">Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Image Gallery */}
        <div className="w-full md:w-1/4 border rounded-lg ">
          <ProductDetailsSlider images={myProduct?.images} />
        </div>

        {/* Right Side: Product Actions */}
        <div className="w-full md:w-3/4 border rounded-lg shadow-sm p-6">
          <div className="flex gap-2 mb-5">
            <Badge className="bg-green-100 text-green-700">
              {myProduct?.category.name}
            </Badge>
            <Badge className="bg-slate-200 text-black">
              {myProduct?.brand.name}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold mb-2 ">{myProduct?.title}</h1>
          <div className="flex items-center gap-1 py-1">
            {setRatingStar(myProduct.ratingsAverage)}
            <span className="text-sm text-gray-400">
              {myProduct?.ratingsAverage} ({myProduct?.ratingsQuantity} reviews)
            </span>
          </div>

          {/* 2. Price Section with Discount Logic */}
          <div className="flex  gap-4 items-center mt-auto pt-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold ">
                {myProduct?.priceAfterDiscount ? (
                  <span className="text-3xl font-bold">
                    {myProduct?.priceAfterDiscount} EGP
                  </span>
                ) : (
                  <span className="text-black">{myProduct?.price} EGP</span>
                )}
              </span>
              {myProduct?.priceAfterDiscount && (
                <span className="text-lg text-gray-400 line-through">
                  {myProduct?.price} EGP
                </span>
              )}
            </div>
            {myProduct?.priceAfterDiscount && (
              <Badge className="bg-red-500 py-4 text-lg">
                Save{" "}
                {Math.round(
                  ((myProduct?.price - myProduct?.priceAfterDiscount) /
                    myProduct?.price) *
                    100,
                )}
                %
              </Badge>
            )}
          </div>

          <Badge className="bg-green-100 text-green-700 font-bold text-md my-10">
            <GoDotFill className="text-green-500 text-2xl " /> In Stock
          </Badge>

          <p className="text-gray-600 my-2 py-4 text-lg  border-t">
            {myProduct?.description}
          </p>

         <PlusMinusOperation product={myProduct} />

          

          <div className="flex gap-4 mb-6">
            <AddButton
              productId={myProduct?.id}
              classes="flex-1 cursor-pointer  bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-bold flex items-center justify-center gap-2"
              icon={<FaCartShopping />}
              afterAdded={[
                "Add to Cart",
                <span
                  key={myProduct?._id}
                  className="flex items-center justify-center gap-2 text-white"
                >
                  <Check size={20} strokeWidth={3} />
                  <span>Added to Cart</span>
                </span>,
              ]}
            />

            <button className="flex-1 cursor-pointer  bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-md font-bold flex items-center justify-center gap-2">
              <MdElectricBolt /> Buy Now
            </button>
          </div>

          <div className="flex gap-4">
            
            <AddToWishlistBtn product={myProduct} />

            <button className="w-1/14  cursor-point transition-all  text-black border-2 border-slate-200 hover:border-green-400 hover:text-green-400 cursor-pointer py-3 rounded-md font-bold flex items-center justify-center gap-2">
              <FaShareAlt />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2 border-t border-gray-100 mt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <FaTruckFast className="text-green-600 text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm leading-tight">
                  {"Free Delivery"}
                </h4>
                <p className="text-gray-400 text-xs mt-1">
                  {"Orders over $50"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <FaArrowRotateLeft className="text-green-600 text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm leading-tight">
                  {"30 Days Return"}
                </h4>
                <p className="text-gray-400 text-xs mt-1">{"Money back"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <FaShieldAlt className="text-green-600 text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm leading-tight">
                  {"Secure Payment"}
                </h4>
                <p className="text-gray-400 text-xs mt-1">{"100% Protected"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Tabs/Details */}
      <CustomTabs product={myProduct} />
    </div>
  );
}
