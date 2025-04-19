/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import toast from "react-hot-toast";
import Button from "../ui/button/Button";
import axios from "axios";
import { assets } from "../assets/assets"; // Adjusted to use named import

const AddProduct = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDiscountPrice, setProductDiscountPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [productColor, setProductColor] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>(["fresh"]);
  const [productType, setProductType] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState<number>(0);
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState("recycled");

  // Environmental impact states
  const [co2Saved, setCo2Saved] = useState<number>(0);
  const [waterSaved, setWaterSaved] = useState<number>(0);
  const [wasteDiverted, setWasteDiverted] = useState<number>(0);

  const categories = {
    recycled: [
      { value: "recycled-furniture", label: "Recycled Furniture" },
      { value: "recycled-materials", label: "Recycled Materials" },
    ],
    upcycled: [
      { value: "upcycled-clothing", label: "Upcycled Clothing" },
      { value: "upcycled-art", label: "Upcycled Art" },
    ],
  };

  const unitOptions = [
    { value: "kg", label: "Kilogram (kg)" },
    { value: "litre", label: "Litre (litre)" },
    { value: "pcs", label: "Pieces (pcs)" },
    { value: "pack", label: "Pack" },
  ];

  const productTypes = [
    { value: "perishable", label: "Perishable" },
    { value: "non-perishable", label: "Non-Perishable" },
    { value: "frozen", label: "Frozen" },
  ];

  useEffect(() => {
    setTotalPrice(pricePerUnit * quantity);
  }, [pricePerUnit, quantity]);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [files]);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setCategory("");
  };

  const handleSubmit = async () => {
    try {
      const productData = {
        productName,
        productCode,
        brand,
        category,
        tags,
        productType,
        pricePerUnit,
        unit,
        quantity,
        totalPrice,
        productPrice,
        productDiscountPrice,
        productColor,
        co2Saved,
        waterSaved,
        wasteDiverted,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      files.forEach((file) => formData.append("images", file));

      const { data } = await axios.post("/api/product/add", formData);

      if (data.success) {
        toast.success(data.message);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const resetForm = () => {
    setProductName("");
    setProductCode("");
    setBrand("");
    setCategory("");
    setTags(["fresh"]);
    setProductType("");
    setPricePerUnit(0);
    setUnit("");
    setQuantity(1);
    setFiles([]);
    setProductPrice("");
    setProductDiscountPrice("");
    setProductColor("");
    setCo2Saved(0);
    setWaterSaved(0);
    setWasteDiverted(0);
  };

  return (
    <ComponentCard title="Add New Product">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Label>Product Image</Label>
          <div className="flex flex-wrap border p-4 rounded-md w-[50vh] items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    type="file"
                    id={`image${index}`}
                    hidden
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      if (e.target.files && e.target.files[0]) {
                        updatedFiles[index] = e.target.files[0];
                        setFiles(updatedFiles);
                      }
                    }}
                  />
                  <img
                    className="max-w-24 cursor-pointer rounded-md"
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : assets.upload_area
                    }
                    alt="uploadArea"
                    width={100}
                    height={100}
                  />
                </label>
              ))}
          </div>
        </div>


        <div className="md:col-span-2">
          <Label>Product Category</Label>
          <div className="border rounded-2xl p-4">
            <Label>Select Type</Label>
            <div className="flex space-x-2 dark:bg-gray-900 p-1 border border-gray-500/50 w-[38vh] rounded-full text-sm">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="options"
                  id="option1"
                  className="hidden peer"
                  checked={selectedOption === "recycled"}
                  onChange={() => handleOptionChange("recycled")}
                />
                <label
                  htmlFor="option1"
                  className="cursor-pointer rounded-full py-2 px-9 text-gray-500 peer-checked:bg-brand-500 peer-checked:text-white"
                >
                  Recycled
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="options"
                  id="option2"
                  className="hidden peer"
                  checked={selectedOption === "upcycled"}
                  onChange={() => handleOptionChange("upcycled")}
                />
                <label
                  htmlFor="option2"
                  className="cursor-pointer rounded-full py-2 px-9 text-gray-500 peer-checked:bg-indigo-600 peer-checked:text-white"
                >
                  Upcycled
                </label>
              </div>
            </div>

            <div className="mt-4">
              <Select
                id="category"
                options={categories[selectedOption]}
                placeholder="Select Category"
                onChange={(val) => setCategory(val?.value)}
              />
            </div>
          </div>
        </div>

        {/* Product Name */}
        <div>
          <Label>Product Name</Label>
          <Input
            placeholder="Red Apple"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div>
          <Label>Product Price</Label>
          <Input
            placeholder="e.g. 100"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>

        <div>
          <Label>Product Discount Price</Label>
          <Input
            placeholder="e.g. 80"
            type="number"
            value={productDiscountPrice}
            onChange={(e) => setProductDiscountPrice(e.target.value)}
          />
        </div>

        <div>
          <Label>Product Color</Label>
          <Input
            placeholder="e.g. Red"
            type="text"
            value={productColor}
            onChange={(e) => setProductColor(e.target.value)}
          />
        </div>

        <div>
          <Label>Brand</Label>
          <Input
            placeholder="Fresh Farms"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div>
          <Label>Unit</Label>
          <Select
            options={unitOptions}
            placeholder="Select Unit"
            onChange={(val) => setUnit(val)}
          />
        </div>

        <div>
          <Label>Product Type</Label>
          <Select
            options={productTypes}
            placeholder="Select Product Type"
            onChange={(val) => setProductType(val)}
          />
        </div>

        <div>
          <Label>CO₂ Saved (kg)</Label>
          <Input
            type="number"
            placeholder="e.g. 4.5"
            value={co2Saved}
            onChange={(e) => setCo2Saved(Number(e.target.value))}
          />
        </div>

        <div>
          <Label>Water Saved (litres)</Label>
          <Input
            type="number"
            placeholder="e.g. 45.0"
            value={waterSaved}
            onChange={(e) => setWaterSaved(Number(e.target.value))}
          />
        </div>

        <div>
          <Label>Waste Diverted (kg)</Label>
          <Input
            type="number"
            placeholder="e.g. 2.3"
            value={wasteDiverted}
            onChange={(e) => setWasteDiverted(Number(e.target.value))}
          />
        </div>

        <div className="md:col-span-2">
          <Button type="button" onClick={handleSubmit}>
            Add Product
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default AddProduct;
