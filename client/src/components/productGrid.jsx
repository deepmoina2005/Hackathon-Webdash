import React from "react"
import { Link } from "react-router-dom"
import { Leaf } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getProducts } from "../../lib/products"

export default function ProductGrid({ featured = false, filters = {} }) {
  const products = getProducts()

  let displayProducts = featured
    ? products.filter((product) => product.featured).slice(0, 4)
    : products

  // Apply material filter
  if (filters.materials?.length) {
    displayProducts = displayProducts.filter((p) =>
      filters.materials.includes(p.materialType)
    )
  }

  // Apply category filter
  if (filters.categories?.length) {
    displayProducts = displayProducts.filter((p) =>
      filters.categories.includes(p.category)
    )
  }

  // Apply impact filter
  if (filters.impacts?.length) {
    displayProducts = displayProducts.filter((p) =>
      filters.impacts.some((impact) => p.impacts?.includes(impact))
    )
  }

  // Apply price filter
  displayProducts = displayProducts.filter(
    (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {displayProducts.map((product) => (
        <Link
          key={product.id}
          to={`/product-all/${product.id}`}
          className="group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
        >
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
            {product.featured && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-green-600 text-white">Featured</Badge>
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-1.5 p-4">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                {product.materialType}
              </Badge>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="font-semibold">${product.price.toFixed(2)}</div>
              <div className="flex items-center text-xs text-green-600">
                <Leaf className="h-3 w-3 mr-1" />
                {product.carbonFootprint} kg CO₂ saved
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}