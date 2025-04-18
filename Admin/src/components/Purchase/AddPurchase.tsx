import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import toast from "react-hot-toast";
import TextArea from "../form/input/TextArea";
import DatePicker from "../../components/form/date-picker"; // Import DatePicker component

const AddPurchaseProduct = () => {
  const [supplier, setSupplier] = useState<string>(""); // Updated type to string
  const [warehouse, setWarehouse] = useState<string>("");
  const [taxRate, setTaxRate] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [receivedAmount, setReceivedAmount] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");
  const [paymentType, setPaymentType] = useState<number | string>("");
  const [status, setStatus] = useState<number | string>("");
  const [purchaseDate, setPurchaseDate] = useState<string>(""); // Date state
  const [message, setMessage] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0); // Quantity state
  const [pricePerUnit, setPricePerUnit] = useState<number>(0); // Price per unit state

  // Demo suppliers data (replace with actual API fetch)
  const suppliers = [
    { value: "S001", label: "Supplier A" },
    { value: "S002", label: "Supplier B" },
    { value: "S003", label: "Supplier C" },
  ];

  // Function to calculate the Grand Total
  const calculateGrandTotal = () => {
    const total = quantity * pricePerUnit;
    const totalWithTax = total + total * (taxRate / 100);
    const finalTotal = totalWithTax + shipping - discount;
    setGrandTotal(finalTotal); // Update the grand total
  };

  const handleSubmit = async () => {
    try {
      const newPurchase = {
        supplier,
        warehouse,
        taxRate,
        shipping,
        discount,
        grandTotal,
        receivedAmount,
        notes,
        paymentType,
        status,
        purchaseDate, // Use the selected purchase date
        productId, // Use manually typed productId
      };

      // API Call to Save Purchase Details (replace with actual API)
      const { data } = await axios.post("/api/purchase/add", newPurchase);

      if (data.success) {
        toast.success(data.message);

        // Reset the form fields after success
        setSupplier("");
        setWarehouse("");
        setTaxRate(0);
        setShipping(0);
        setDiscount(0);
        setGrandTotal(0);
        setReceivedAmount(0);
        setNotes("");
        setPaymentType("");
        setStatus("");
        setPurchaseDate("");
        setMessage("");
        setProductId("");

        // Navigate to the All Purchases page
        history.push("/all-purchase"); // Redirect to the All Purchases page
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <ComponentCard title="Add New Purchase">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product ID Input */}
        <div>
          <Label>Product ID</Label>
          <Input
            placeholder="Enter Product ID"
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>
        {/* Product Expiry Date Picker */}
        <div>
          <Label>Product Expiry</Label>
          <DatePicker
            id="date-picker"
            placeholder="Select a date"
            onChange={(dates, currentDateString) => {
              // Handle your logic
              console.log({ dates, currentDateString });
            }}
          />
        </div>

        {/* Quantity Input */}
        <div>
          <Label>Quantity</Label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => {
              setQuantity(Number(e.target.value));
              calculateGrandTotal(); // Recalculate grand total on quantity change
            }}
          />
        </div>

        {/* Price Per Unit Input */}
        <div>
          <Label>Price Per Unit</Label>
          <Input
            type="number"
            value={pricePerUnit}
            onChange={(e) => {
              setPricePerUnit(Number(e.target.value));
              calculateGrandTotal(); // Recalculate grand total on price change
            }}
          />
        </div>

        {/* Supplier Select */}
        <div>
          <Label>Supplier</Label>
          <Select
            options={suppliers}
            value={supplier}
            placeholder="Select Supplier"
            onChange={(val) => setSupplier(val)}
          />
        </div>

        <div>
          <Label>Warehouse</Label>
          <Input
            placeholder="Enter Warehouse"
            type="text"
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
          />
        </div>

        <div>
          <Label>Tax Rate (%)</Label>
          <Input
            type="number"
            value={taxRate}
            onChange={(e) => {
              setTaxRate(Number(e.target.value));
              calculateGrandTotal(); // Recalculate grand total on tax rate change
            }}
          />
        </div>

        <div>
          <Label>Shipping</Label>
          <Input
            type="number"
            value={shipping}
            onChange={(e) => {
              setShipping(Number(e.target.value));
              calculateGrandTotal(); // Recalculate grand total on shipping change
            }}
          />
        </div>

        <div>
          <Label>Discount</Label>
          <Input
            type="number"
            value={discount}
            onChange={(e) => {
              setDiscount(Number(e.target.value));
              calculateGrandTotal(); // Recalculate grand total on discount change
            }}
          />
        </div>

        <div>
          <Label>Grand Total</Label>
          <Input type="number" disabled value={grandTotal} />
        </div>

        <div>
          <Label>Payment Type</Label>
          <Select
            options={[
              { value: "cash", label: "Cash" },
              { value: "credit", label: "Credit" },
            ]}
            placeholder="Select Payment Type"
            onChange={(val) => setPaymentType(val)}
          />
        </div>

        <div>
          <Label>Status</Label>
          <Select
            options={[
              { value: "pending", label: "Pending" },
              { value: "completed", label: "Completed" },
              { value: "cancelled", label: "Cancelled" },
            ]}
            placeholder="Select Status"
            onChange={(val) => setStatus(val)}
          />
        </div>

        <div className="space-y-6">
          <div>
            <Label>Description</Label>
            <TextArea
              value={message}
              onChange={(value) => setMessage(value)}
              rows={6}
            />
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-brand-500 text-white px-4 py-2 rounded mt-6"
          >
            Purchased Product
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default AddPurchaseProduct;
