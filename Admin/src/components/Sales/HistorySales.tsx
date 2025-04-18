import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useState } from "react";
import { Eye, PlusCircle } from "lucide-react";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";

interface Product {
  id: number;
  image: string;
  name: string;
  barcode: string;
  quantity: number;
  price: string;
  status: string;
  salesDate: string;
  paymentMethod: string;
}

// Dummy data omitted for brevity (same as in your original post)
const tableData: Product[] = [
  {
    id: 1,
    image: "/images/products/product-1.jpg",
    name: "Apple",
    barcode: "123456789",
    quantity: 10,
    price: "$2.50",
    status: "Active",
    salesDate: "2025-04-01",
    paymentMethod: "Cash",
  },
  {
    id: 2,
    image: "/images/products/product-2.jpg",
    name: "Banana",
    barcode: "987654321",
    quantity: 6,
    price: "$1.20",
    status: "Pending",
    salesDate: "2025-04-03",
    paymentMethod: "Online",
  },
  {
    id: 3,
    image: "/images/products/product-3.jpg",
    name: "Orange",
    barcode: "111223344",
    quantity: 8,
    price: "$3.00",
    status: "Active",
    salesDate: "2025-04-08",
    paymentMethod: "Cash",
  },
  {
    id: 4,
    image: "/images/products/product-4.jpg",
    name: "Strawberry",
    barcode: "555667788",
    quantity: 12,
    price: "$4.75",
    status: "Active",
    salesDate: "2025-04-09",
    paymentMethod: "Online",
  },
  {
    id: 5,
    image: "/images/products/product-5.jpg",
    name: "Blueberry",
    barcode: "999000111",
    quantity: 7,
    price: "$5.10",
    status: "Pending",
    salesDate: "2025-04-10",
    paymentMethod: "Cash",
  },
  {
    id: 6,
    image: "/images/products/product-6.jpg",
    name: "Mango",
    barcode: "333222111",
    quantity: 5,
    price: "$3.30",
    status: "Active",
    salesDate: "2025-04-02",
    paymentMethod: "Online",
  },
  {
    id: 7,
    image: "/images/products/product-7.jpg",
    name: "Pineapple",
    barcode: "222111333",
    quantity: 4,
    price: "$2.90",
    status: "Pending",
    salesDate: "2025-04-04",
    paymentMethod: "Cash",
  },
  {
    id: 8,
    image: "/images/products/product-8.jpg",
    name: "Grapes",
    barcode: "444555666",
    quantity: 9,
    price: "$3.40",
    status: "Active",
    salesDate: "2025-04-05",
    paymentMethod: "Online",
  },
  {
    id: 9,
    image: "/images/products/product-9.jpg",
    name: "Watermelon",
    barcode: "777888999",
    quantity: 3,
    price: "$6.00",
    status: "Active",
    salesDate: "2025-04-06",
    paymentMethod: "Cash",
  },
  {
    id: 10,
    image: "/images/products/product-10.jpg",
    name: "Lemon",
    barcode: "000111222",
    quantity: 2,
    price: "$1.80",
    status: "Pending",
    salesDate: "2025-04-07",
    paymentMethod: "Online",
  },
  {
    id: 11,
    image: "/images/products/product-11.jpg",
    name: "Guava",
    barcode: "888999000",
    quantity: 5,
    price: "$2.60",
    status: "Active",
    salesDate: "2025-04-08",
    paymentMethod: "Cash",
  },
  {
    id: 12,
    image: "/images/products/product-12.jpg",
    name: "Papaya",
    barcode: "123123123",
    quantity: 6,
    price: "$3.90",
    status: "Pending",
    salesDate: "2025-04-09",
    paymentMethod: "Online",
  },
  {
    id: 13,
    image: "/images/products/product-13.jpg",
    name: "Kiwi",
    barcode: "321321321",
    quantity: 4,
    price: "$4.20",
    status: "Active",
    salesDate: "2025-04-10",
    paymentMethod: "Cash",
  },
  {
    id: 14,
    image: "/images/products/product-14.jpg",
    name: "Pear",
    barcode: "111000999",
    quantity: 10,
    price: "$2.80",
    status: "Active",
    salesDate: "2025-04-01",
    paymentMethod: "Online",
  },
  {
    id: 15,
    image: "/images/products/product-15.jpg",
    name: "Peach",
    barcode: "444888777",
    quantity: 8,
    price: "$3.50",
    status: "Pending",
    salesDate: "2025-04-02",
    paymentMethod: "Cash",
  },
  {
    id: 16,
    image: "/images/products/product-16.jpg",
    name: "Plum",
    barcode: "999888777",
    quantity: 7,
    price: "$2.70",
    status: "Active",
    salesDate: "2025-04-03",
    paymentMethod: "Online",
  },
  {
    id: 17,
    image: "/images/products/product-17.jpg",
    name: "Cherry",
    barcode: "555444333",
    quantity: 5,
    price: "$4.60",
    status: "Pending",
    salesDate: "2025-04-04",
    paymentMethod: "Cash",
  },
  {
    id: 18,
    image: "/images/products/product-18.jpg",
    name: "Raspberry",
    barcode: "666777888",
    quantity: 6,
    price: "$5.00",
    status: "Active",
    salesDate: "2025-04-05",
    paymentMethod: "Online",
  },
  {
    id: 19,
    image: "/images/products/product-19.jpg",
    name: "Coconut",
    barcode: "112233445",
    quantity: 9,
    price: "$3.60",
    status: "Active",
    salesDate: "2025-04-06",
    paymentMethod: "Cash",
  },
  {
    id: 20,
    image: "/images/products/product-20.jpg",
    name: "Lychee",
    barcode: "998877665",
    quantity: 4,
    price: "$2.95",
    status: "Pending",
    salesDate: "2025-04-07",
    paymentMethod: "Online",
  },
];

// Assume `tableData` array is here with all 20 products

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function HistorySales() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProducts = tableData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcode.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddProduct = () => {
    navigate("/new-sales");
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between gap-4 p-4">
            <form className="w-full sm:max-w-md">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="fill-gray-500 dark:fill-gray-400"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2.5 pl-12 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </form>

            <Button
              onClick={handleAddProduct}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              <PlusCircle className="w-5 h-5" />
              New Sales Product
            </Button>
          </div>

          <div className="p-2 border rounded-lg m-2">
            <Table>
              <TableHeader className="bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-200 text-center">
                <TableRow>
                  <TableCell isHeader className="px-4 py-3">
                    Customer ID
                  </TableCell>
                  <TableCell isHeader className="px-4 py-3">
                    Product Name
                  </TableCell>
                  <TableCell isHeader className="px-4 py-3">
                    Total Price
                  </TableCell>
                  <TableCell isHeader className="px-4 py-3">
                    Quantity
                  </TableCell>
                  <TableCell isHeader className="px-4 py-3">
                    Payment Status
                  </TableCell>
                  <TableCell isHeader className="px-4 py-3">
                    Payment Method
                  </TableCell>
                  <TableCell isHeader className="px-4 py-3">
                    Total Product
                  </TableCell>
                  <TableCell isHeader className="px-4 py-3">
                    Sales Date
                  </TableCell>
                  <TableCell isHeader className="px-4 py-3">
                    Invoice
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-200 dark:divide-gray-700 text-center text-sm">
                {paginatedProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <TableCell className="px-4 py-3">#{product.id}</TableCell>
                    <TableCell className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      $
                      {(
                        parseFloat(product.price.replace("$", "")) *
                        product.quantity
                      ).toFixed(2)}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {product.quantity}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Badge
                        size="sm"
                        color={
                          product.status === "Active"
                            ? "success"
                            : product.status === "Pending"
                            ? "warning"
                            : "error"
                        }
                        className="px-2 py-1"
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Badge
                        size="sm"
                        color={
                          product.paymentMethod === "Cash"
                            ? "success"
                            : product.paymentMethod === "Online"
                            ? "info"
                            : "secondary"
                        }
                        className="px-2 py-1"
                      >
                        {product.paymentMethod}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {product.quantity}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {formatDate(product.salesDate)}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center justify-center">
                        <Eye className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-200 cursor-pointer" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between px-4 py-3 text-gray-500">
            <Button
              variant="ghost"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="flex items-center gap-2"
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
              Previous
            </Button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-md ${
                      currentPage === page
                        ? "bg-indigo-500 text-white"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <Button
              variant="ghost"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="flex items-center gap-2"
            >
              Next
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
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
