import React, { useState, useEffect } from "react";
import { Leaf, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom"; // react-router-dom for routing
import { Button } from "@/components/ui/button"; // Assuming you have a custom Button component
import { Separator } from "@/components/ui/separator"; // Assuming you have a custom Separator component
import { Badge } from "@/components/ui/badge"; // Assuming you have a custom Badge component
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Tabs UI component
import AddToCartButton from "@/components/add-to-cart-button"; // Assuming you have an AddToCartButton component
import CarbonFootprintDisplay from "@/components/carbon-footprint-display"; // Assuming you have a CarbonFootprintDisplay component

// Dummy API call function - Replace with actual API or database logic
const getProductById = async (id) => {
  try {
    const response = await fetch(`/api/product-all/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null; // Return null in case of an error
  }
};

const SingleProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // Product state

  // Fetch product data when the component mounts or the ID changes
  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductById(id);
      setProduct(productData);
    };

    fetchProduct();
  }, [id]); // Dependency array to refetch if product ID changes

  if (!product) {
    return (
      <div className="container px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
        <Button asChild>
          <Link to="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <Link
        to="/products"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-md bg-muted">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${i}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800"
              >
                {product.materialType}
              </Badge>
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800"
              >
                {product.category}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <CarbonFootprintDisplay carbonSaved={product.carbonFootprint} />

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button className="bg-green-600 hover:bg-green-700 flex-1">Buy Now</Button>
              <AddToCartButton product={product} />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[{ icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
              { icon: ShieldCheck, title: "Quality Guarantee", desc: "Durable & sustainable" },
              { icon: Leaf, title: "Eco-Friendly", desc: "100% recycled materials" }]
              .map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/50">
                  <item.icon className="h-6 w-6 mb-2 text-green-600" />
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
          </div>

          <Separator />

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 pt-4">
              <h3 className="font-medium">Product Details</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Dimensions: {product.details?.dimensions || "Various sizes available"}</li>
                <li>Weight: {product.details?.weight || "0.5 kg"}</li>
                <li>Made in: {product.details?.madeIn || "Locally sourced"}</li>
                <li>Care instructions: {product.details?.care || "Hand wash only"}</li>
              </ul>
            </TabsContent>
            <TabsContent value="materials" className="space-y-4 pt-4">
              <h3 className="font-medium">Materials & Sourcing</h3>
              <p className="text-sm">
                This product is made from {product.materialType.toLowerCase()} that has been carefully sourced and
                processed to minimize environmental impact.
              </p>
            </TabsContent>
            <TabsContent value="impact" className="space-y-4 pt-4">
              <h3 className="font-medium">Environmental Impact</h3>
              <div className="space-y-3">
                <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">CO₂ Saved</span>
                    <span className="text-sm font-bold text-green-700 dark:text-green-300">
                      {product.carbonFootprint} kg
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
