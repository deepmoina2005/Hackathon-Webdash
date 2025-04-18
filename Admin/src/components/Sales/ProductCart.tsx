import React, { useState } from "react";
import Button from "../ui/button/Button";
import { Plus } from "lucide-react";

type ProductType = {
  name: string;
  category: string;
  price: number;
  image: string;
};

const ProductCart = ({ product }: { product: ProductType }) => {
  const [count, setCount] = useState(0);

  return (
    <div
      className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]
  p-3 transition-all duration-200 min-w-47 max-w-56 w-full"
    >
      {/* Product Image */}
      <div className="group cursor-pointer flex items-center justify-center bg-brand-200 rounded-xl">
        <img
          className="group-hover:scale-105 transition-transform duration-200 max-w-28 md:max-w-36"
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* Category & Name */}
      <div className="text-sm mt-2">
        <p className="text-gray-400 dark:text-gray-500 mb-0.5">
          {product.category}
        </p>
        <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg truncate">
          {product.name}
        </p>
      </div>

      {/* Price & Add to Cart */}
      <div className="flex items-end justify-between mt-4">
        <p className="text-indigo-600 dark:text-indigo-400 mb-2 font-semibold text-lg">
        ₹ {product.price}
        </p>
        <div className="text-indigo-600 dark:text-indigo-400">
          {count === 0 ? (
            <Button onClick={() => setCount(1)}>
              <Plus width={18} height={18} />
              Add
            </Button>
          ) : (
            <div className="flex items-center gap-2 bg-indigo-500/20 rounded-md px-2 h-[34px] select-none">
              <button
                onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
                className="px-2 text-lg font-medium hover:text-indigo-700 transition"
              >
                -
              </button>
              <span className="w-5 text-center text-sm">{count}</span>
              <button
                onClick={() => setCount((prev) => prev + 1)}
                className="px-2 text-lg font-medium hover:text-indigo-700 transition"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
