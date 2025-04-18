import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Eye, Trash2, PlusCircle } from "lucide-react";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";// Import useNavigate from react-router-dom

interface Purchase {
  id: number;
  productId: string;
  supplier: string;
  purchaseDate: string;
  quantity: number;
  pricePerUnit: number;
  totalAmount: number;
  status: string;
}

const sampleData: Purchase[] = [
  {
    id: 1,
    productId: "P001",
    supplier: "Supplier A",
    purchaseDate: "2025-04-01",
    quantity: 10,
    pricePerUnit: 15,
    totalAmount: 150,
    status: "Completed",
  },
  {
    id: 2,
    productId: "P002",
    supplier: "Supplier B",
    purchaseDate: "2025-04-03",
    quantity: 5,
    pricePerUnit: 20,
    totalAmount: 100,
    status: "Pending",
  },
  {
    id: 3,
    productId: "P003",
    supplier: "Supplier C",
    purchaseDate: "2025-04-05",
    quantity: 8,
    pricePerUnit: 25,
    totalAmount: 200,
    status: "Cancelled",
  },
];

const PurchaseHistoryTable = () => {
  const [purchases, setPurchases] = useState<Purchase[]>(sampleData);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate(); // Initialize navigate

  const handleView = (id: number) => {
    console.log(`Viewing purchase with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    setPurchases((prevPurchases) => prevPurchases.filter((purchase) => purchase.id !== id));
  };

  const handleAddProduct = () => {
    navigate("/add-purchase"); // Navigate to the Add Purchase page
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        {/* Search and Add Product Section */}
        <div className="flex justify-between p-4">
          <form className="flex gap-2">
            <div className="relative">
              <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                <svg
                  className="fill-gray-500 dark:fill-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          
          <Button
            onClick={handleAddProduct}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <PlusCircle className="mr-2" />
            New Purchase
          </Button>
        </div>

        {/* Table for Purchase History */}
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Product ID
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Supplier
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Purchase Date
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Quantity
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Price Per Unit
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Total Amount
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  {purchase.productId}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {purchase.supplier}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {purchase.purchaseDate}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {purchase.quantity}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  ${purchase.pricePerUnit.toFixed(2)}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  ${purchase.totalAmount.toFixed(2)}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={purchase.status === "Completed" ? "success" : purchase.status === "Pending" ? "warning" : "error"}
                  >
                    {purchase.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleView(purchase.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Eye />
                    </button>
                    <button
                      onClick={() => handleDelete(purchase.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PurchaseHistoryTable;
