import Select from "../form/Select";
import Button from "../ui/button/Button";

const NewSalescustomer = () => {
  const options = [
    { value: "cash", label: "Cash" },
    { value: "online", label: "Online" },
  ];

  const products = [
    {
      name: "Running Shoes",
      offerPrice: 250,
      price: 200,
      quantity: 1,
      size: 42,
      category: "Footwear",
    },
    {
      name: "Running Shoes",
      offerPrice: 250,
      price: 200,
      quantity: 1,
      size: 42,
      category: "Footwear",
    },
    {
      name: "Running Shoes",
      offerPrice: 250,
      price: 200,
      quantity: 1,
      size: 42,
      category: "Footwear",
    },
    {
      name: "Running Shoes",
      offerPrice: 250,
      price: 200,
      quantity: 1,
      size: 42,
      category: "Footwear",
    },
  ];

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
      <div className="flex flex-wrap gap-6 mt-5 items-stretch w-full">
        {/* Shopping Cart */}
        <div className="flex-1 min-w-[320px] bg-white dark:bg-gray-800 p-6 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-sans flex flex-col">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
            Shopping Cart
          </h1>

          <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-800 dark:text-gray-200 font-semibold pb-2 pt-2 border-b border-dashed border-gray-400 dark:border-gray-600 text-xs uppercase tracking-wide">
            <p className="text-left">Product</p>
            <p className="text-center">Subtotal</p>
            <p className="text-center">Action</p>
          </div>

          {/* Scrollable Product List */}
          <div className="max-h-[200px] overflow-y-auto pr-2 custom-scroll-hidden">
            {products.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_1fr_1fr] items-center py-4 text-gray-700 dark:text-gray-300 border-b border-dashed border-gray-300 dark:border-gray-600"
              >
                <div>
                  <p className="font-medium text-lg">{product.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Size: {product.size || "N/A"}
                  </p>
                </div>
                <p className="text-center text-indigo-600 dark:text-indigo-400 font-semibold">
                ₹ {product.offerPrice * product.quantity}
                </p>
                <button className="mx-auto p-2 rounded transition transform hover:scale-105">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                      stroke="#FF532E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10">            
            <hr className="border-gray-300 dark:border-gray-600" />
            <div className="text-gray-600 dark:text-gray-300 mt-4 space-y-2">
              <p className="flex justify-between">
                <span>Price</span>
                <span>₹ 20</span>
              </p>
              <p className="flex justify-between">
                <span>Tax (2%)</span>
                <span>₹ 20</span>
              </p>
              {/* Totals */}
              <div className="flex justify-between pt-6 font-bold text-gray-800 dark:text-white text-sm border-t border-dashed border-gray-400 dark:border-gray-600 mt-6">
                <span>Total Items: {products.length}</span>
                <span>
                ₹ 
                  {" "}{products.reduce(
                    (total, product) =>
                      total + product.offerPrice * product.quantity,
                    0
                  )}
                </span>
              </div>
            </div>
            <div className="mt-10">
              <Select
                options={options}
                placeholder="Select Payment Method"
                onChange={handleSelectChange}
                className="dark:bg-dark-900 border border-gray-300 dark:border-gray-600 rounded-md"
              />
            </div>
          </div>

          <div className="flex pt-6 justify-end">
            <Button>
              Confirm To Sell
            </Button>
          </div>
        </div>
      </div>
  );
};

export default NewSalescustomer;
