"use client";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { ProductType } from "@/api/types/product.type";
import { CartContext } from "@/context/CartContext";

export default function PlusMinusOperation({
  product,
}: {
  product: ProductType;
}) {
  //const [quantity, setQuantity] = useState(1);
  const {quantity, setQuantity} = useContext(CartContext)
  useEffect(() => {
    setQuantity(1);
  }, []);
  const updateQuantity = (sign: string) => {
    if (sign === "-" && quantity != 1) {
      setQuantity(quantity - 1);
    }
    if (sign === "+") {
      setQuantity(quantity + 1);
    }
  };

  return (
    <>
      <div className="mb-6">
        {/* Label - Darker and clean */}
        <h3 className="text-lg font-medium text-slate-800 mb-3">Quantity</h3>

        <div className="flex items-center gap-6">
          {/* The Control Box */}
          <div className="flex items-center border-2 border-slate-100 rounded-2xl p-1 bg-white shadow-sm">
            <Button
              onClick={() => {
                updateQuantity("-");
              }}
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-slate-500 hover:text-green-400 cursor-pointer   hover:bg-slate-50 rounded-xl transition-colors"
            >
              <Minus size={20} strokeWidth={2.5} />
            </Button>

            {/* Quantity Display */}
            <div className="w-16 text-center">
              <span className="text-xl font-semibold text-slate-700">
                {quantity}
              </span>
            </div>

            <Button
              onClick={() => {
                updateQuantity("+");
              }}
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-slate-500 hover:text-green-400 cursor-pointer   hover:bg-slate-50 rounded-xl transition-colors"
            >
              <Plus size={20} strokeWidth={2.5} />
            </Button>
          </div>

          {/* Availability text - Soft and professional */}
          <span className="text-lg text-slate-400 font-medium">
            {product.quantity - quantity} available
          </span>
        </div>
      </div>
      <div className="flex justify-between bg-slate-100 p-4 rounded-2xl items-center mb-6">
        <span className="text-gray-600 text-lg">Total Price:</span>
        <span className="text-3xl font-bold text-green-600">

          {product.priceAfterDiscount ? (<div>{product?.priceAfterDiscount*quantity}.00 EGP</div>) :(<div>{product?.price*quantity}.00 EGP</div>)}
        </span>
      </div>
    </>
  );
}
