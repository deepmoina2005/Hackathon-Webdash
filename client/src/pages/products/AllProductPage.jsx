import React, { useState } from "react"
import { Leaf, Filter } from "lucide-react"
import ProductGrid from "@/components/productGrid"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

export default function AllProductPage() {
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedImpacts, setSelectedImpacts] = useState([])
  const [priceRange, setPriceRange] = useState([0, 200])

  const handleCheckboxChange = (value, setState) => {
    setState((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 mt-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-20 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h2>
              <Separator className="mb-4" />

              <div className="space-y-4">
                {/* Material Type Filter */}
                <div>
                  <h3 className="font-medium mb-2">Material Type</h3>
                  <div className="space-y-2">
                    {["Recycled Plastic", "Upcycled Denim", "Reclaimed Wood", "Repurposed Glass", "Recycled Paper"].map(
                      (material) => (
                        <div key={material} className="flex items-center space-x-2">
                          <Checkbox
                            id={`material-${material}`}
                            checked={selectedMaterials.includes(material)}
                            onCheckedChange={() =>
                              handleCheckboxChange(material, setSelectedMaterials)
                            }
                          />
                          <label htmlFor={`material-${material}`} className="text-sm">
                            {material}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <Separator />

                {/* Category Filter */}
                <div>
                  <h3 className="font-medium mb-2">Product Category</h3>
                  <div className="space-y-2">
                    {["Home Decor", "Fashion", "Kitchen", "Accessories", "Furniture", "Stationery"].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() =>
                            handleCheckboxChange(category, setSelectedCategories)
                          }
                        />
                        <label htmlFor={`category-${category}`} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Price Range Filter */}
                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={(val) => setPriceRange(val)}
                    max={200}
                    step={1}
                    className="my-6"
                  />
                  <div className="flex justify-between">
                    <span className="text-sm">${priceRange[0]}</span>
                    <span className="text-sm">${priceRange[1]}</span>
                  </div>
                </div>

                <Separator />

                {/* Environmental Impact Filter */}
                <div>
                  <h3 className="font-medium mb-2">Environmental Impact</h3>
                  <div className="space-y-2">
                    {["High CO₂ Savings", "Water Conservation", "Plastic Reduction", "Zero Waste"].map((impact) => (
                      <div key={impact} className="flex items-center space-x-2">
                        <Checkbox
                          id={`impact-${impact}`}
                          checked={selectedImpacts.includes(impact)}
                          onCheckedChange={() =>
                            handleCheckboxChange(impact, setSelectedImpacts)
                          }
                        />
                        <label htmlFor={`impact-${impact}`} className="text-sm">
                          {impact}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">Apply Filters</Button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All Products</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Leaf className="h-4 w-4 mr-1 text-green-600" />
              <span>All products are 100% recycled or upcycled</span>
            </div>
          </div>

          <ProductGrid
            filters={{
              materials: selectedMaterials,
              categories: selectedCategories,
              impacts: selectedImpacts,
              priceRange: priceRange
            }}
          />
        </div>
      </div>
    </div>
  )
}
