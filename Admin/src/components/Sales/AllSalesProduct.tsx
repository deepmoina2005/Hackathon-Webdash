import { useState } from "react";
import ProductCart from "./ProductCart";
import img2 from "../../assets/coca_cola_image.png";
import img3 from "../../assets/basmati_rice_image.png";
import img4 from "../../assets/fanta_image_1.png";
import img5 from "../../assets/knorr_soup_image.png";
import img6 from "../../assets/maggi_image.png";
import img7 from "../../assets/maggi_oats_image.png";
import img8 from "../../assets/seven_up_image_1.png";
import img9 from "../../assets/sprite_image_1.png";
import img10 from "../../assets/top_ramen_image.png";
import img11 from "../../assets/yippee_image.png";
import Select from "../form/Select";

const products = [
  {
    name: "Coca Cola",
    category: "Beverages",
    price: 40,
    offerPrice: 35,
    image: img2,
  },
  {
    name: "Basmati Rice",
    category: "Grains",
    price: 120,
    offerPrice: 100,
    image: img3,
  },
  {
    name: "Fanta",
    category: "Beverages",
    price: 40,
    offerPrice: 35,
    image: img4,
  },
  {
    name: "Knorr Soup",
    category: "Instant Food",
    price: 35,
    offerPrice: 30,
    image: img5,
  },
  {
    name: "Maggi Noodles",
    category: "Instant Food",
    price: 15,
    offerPrice: 12,
    image: img6,
  },
  {
    name: "Maggi Oats",
    category: "Snacks",
    price: 25,
    offerPrice: 20,
    image: img7,
  },
  {
    name: "7Up",
    category: "Beverages",
    price: 40,
    offerPrice: 36,
    image: img8,
  },
  {
    name: "Sprite",
    category: "Beverages",
    price: 40,
    offerPrice: 36,
    image: img9,
  },
  {
    name: "Top Ramen",
    category: "Instant Food",
    price: 20,
    offerPrice: 18,
    image: img10,
  },
  {
    name: "Yippee",
    category: "Instant Food",
    price: 20,
    offerPrice: 18,
    image: img11,
  },
];

const categoryOptions = [
  { value: "", label: "All Categories" },
  { value: "Beverages", label: "Beverages" },
  { value: "Grains", label: "Grains" },
  { value: "Instant Food", label: "Instant Food" },
  { value: "Snacks", label: "Snacks" },
];

const AllSalesProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const productsPerPage = 8;

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to the first page when search text changes
  };

  const handleSelectChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1); // Reset to the first page when category changes
  };

  return (
    <div>
      <div className="py-4 flex flex-row gap-4 items-center w-full">
        <div className="flex-[3]">
          <div className="flex items-center gap-3 max-w-md w-full">
            <div className="flex items-center w-full border pl-3 gap-2 bg-white dark:bg-transparent border-gray-500/30 h-[46px] rounded-md overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 30 30"
                fill="#6B7280"
              >
                <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
              </svg>
              <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Search for products"
                className="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-sm"
              />
            </div>
          </div>
        </div>
        <div className="flex-[1]">
          <Select
            options={categoryOptions}
            placeholder="Select Category"
            onChange={(e) => handleSelectChange(e.target.value)}
            className="dark:bg-dark-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentProducts.map((product, index) => (
          <ProductCart key={index} product={product} />
        ))}
      </div>

      {filteredProducts.length > productsPerPage && (
        <div className="flex items-center justify-center mt-8 gap-2 text-gray-500">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-4 flex items-center gap-1"
          >
            <svg
              className="mt-px"
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.75 12.5h11.5m-11.5 0 4.792-4.791M5.75 12.5l4.792 4.792"
                stroke="#6B7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Previous</span>
          </button>

          <div className="flex gap-2 text-sm md:text-base">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`w-9 md:w-12 h-9 md:h-12 rounded-md flex items-center justify-center aspect-square ${
                  currentPage === i + 1
                    ? "bg-brand-500 text-white"
                    : "hover:bg-gray-300/10"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="ml-4 flex items-center gap-1"
          >
            <span>Next</span>
            <svg
              className="mt-px"
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.25 11.5H5.75m11.5 0-4.792-4.79m4.792 4.79-4.792 4.792"
                stroke="#6B7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default AllSalesProduct;