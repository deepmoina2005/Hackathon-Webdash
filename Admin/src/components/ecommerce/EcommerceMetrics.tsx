import {
  ArrowDown,
  ArrowUp,
  Package,
  Users,
  DollarSign,
  ShoppingCart,
  RotateCcw,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import Badge from "../ui/badge/Badge";

const MetricCard = ({ icon: Icon, label, value, change }) => {
  const isPositive = change >= 0;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        <Icon className="text-gray-800 size-6 dark:text-white/90" />
      </div>
      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {label}
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {value}
          </h4>
        </div>
        <Badge color={isPositive ? "success" : "error"}>
          {isPositive ? (
            <ArrowUp className="size-4 mr-1" />
          ) : (
            <ArrowDown className="size-4 mr-1" />
          )}
          {Math.abs(change)}%
        </Badge>
      </div>
    </div>
  );
};

export default function EcommerceMetrics() {
  const metrics = [
    {
      icon: Users,
      label: "Customers",
      value: "3,782",
      change: 11.01,
    },
    {
      icon: ShoppingCart,
      label: "Orders",
      value: "5,359",
      change: -9.05,
    },
    {
      icon: DollarSign,
      label: "Revenue",
      value: "$12,940",
      change: 5.76,
    },
    {
      icon: Package,
      label: "Products Sold",
      value: "2,134",
      change: 7.82,
    },
    {
      icon: RotateCcw,
      label: "Returns",
      value: "154",
      change: -3.21,
    },
    {
      icon: TrendingDown,
      label: "Low Stock Items",
      value: "48",
      change: -1.5,
    },
    {
      icon: TrendingUp,
      label: "New Signups",
      value: "943",
      change: 13.4,
    },
    {
      icon: DollarSign,
      label: "Avg Order Value",
      value: "$24.67",
      change: 2.91,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}
