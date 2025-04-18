import type { Product } from "./types"

const products: Product[] = [
  {
    id: "recycled-water-bottle",
    name: "Ocean Plastic Water Bottle",
    description:
      "Reusable water bottle made from recycled ocean plastic. Each bottle prevents 5 plastic bottles from entering our oceans.",
    price: 24.99,
    image: "/placeholder.svg",
    materialType: "Recycled Plastic",
    category: "Kitchen",
    carbonFootprint: 3.2,
    featured: true,
    details: {
      dimensions: "9 inches x 3 inches",
      weight: "0.3 kg",
      madeIn: "USA",
      care: "Dishwasher safe, top rack only",
    },
  },
  {
    id: "upcycled-denim-tote",
    name: "Upcycled Denim Tote Bag",
    description:
      "Stylish and durable tote bag made from upcycled denim jeans. Each bag gives new life to discarded clothing.",
    price: 39.99,
    image: "/placeholder.svg",
    materialType: "Upcycled Denim",
    category: "Fashion",
    carbonFootprint: 4.5,
    featured: true,
    details: {
      dimensions: "16 inches x 14 inches x 4 inches",
      weight: "0.5 kg",
      madeIn: "Canada",
      care: "Spot clean only",
    },
  },
  {
    id: "bamboo-cutlery-set",
    name: "Bamboo Travel Cutlery Set",
    description:
      "Portable bamboo cutlery set including fork, knife, spoon, and chopsticks. Perfect for reducing single-use plastic while on the go.",
    price: 18.99,
    originalPrice: 24.99,
    image: "/placeholder.svg",
    materialType: "Sustainable Bamboo",
    category: "Kitchen",
    carbonFootprint: 1.8,
    details: {
      dimensions: "8 inches x 2 inches x 1 inch",
      weight: "0.1 kg",
      madeIn: "Vietnam",
      care: "Hand wash with mild soap",
    },
  },
  {
    id: "recycled-glass-vase",
    name: "Recycled Glass Flower Vase",
    description:
      "Beautiful handcrafted vase made from 100% recycled glass. Each piece is unique with slight variations in color and texture.",
    price: 34.99,
    image: "/placeholder.svg",
    materialType: "Recycled Glass",
    category: "Home Decor",
    carbonFootprint: 2.7,
    featured: true,
    details: {
      dimensions: "8 inches x 4 inches",
      weight: "0.8 kg",
      madeIn: "Mexico",
      care: "Hand wash only",
    },
  },
  {
    id: "reclaimed-wood-shelf",
    name: "Reclaimed Wood Floating Shelf",
    description:
      "Rustic floating shelf made from reclaimed barn wood. Each shelf is unique with its own grain pattern and character.",
    price: 49.99,
    image: "/placeholder.svg",
    materialType: "Reclaimed Wood",
    category: "Home Decor",
    carbonFootprint: 5.3,
    details: {
      dimensions: "24 inches x 8 inches x 2 inches",
      weight: "1.2 kg",
      madeIn: "USA",
      care: "Dust with dry cloth",
    },
  },
  {
    id: "recycled-paper-notebook",
    name: "Recycled Paper Notebook",
    description:
      "Eco-friendly notebook made from 100% post-consumer recycled paper. Includes 80 lined pages perfect for notes, journaling, or sketching.",
    price: 12.99,
    image: "/placeholder.svg",
    materialType: "Recycled Paper",
    category: "Stationery",
    carbonFootprint: 1.2,
    details: {
      dimensions: "8.5 inches x 5.5 inches",
      weight: "0.2 kg",
      madeIn: "Italy",
      care: "Keep dry",
    },
  },
  {
    id: "solar-powered-charger",
    name: "Solar Powered Phone Charger",
    description:
      "Portable solar panel charger for smartphones and small devices. Harness the power of the sun for your everyday charging needs.",
    price: 59.99,
    originalPrice: 69.99,
    image: "/placeholder.svg",
    materialType: "Recycled Plastic",
    category: "Electronics",
    carbonFootprint: 6.8,
    featured: true,
    details: {
      dimensions: "6 inches x 3 inches x 0.5 inches",
      weight: "0.3 kg",
      madeIn: "Germany",
      care: "Wipe clean with damp cloth",
    },
  },
  {
    id: "upcycled-tire-doormat",
    name: "Upcycled Tire Doormat",
    description:
      "Durable outdoor doormat made from upcycled rubber tires. Weather-resistant and perfect for high-traffic areas.",
    price: 29.99,
    image: "/placeholder.svg",
    materialType: "Upcycled Rubber",
    category: "Home Decor",
    carbonFootprint: 4.1,
    details: {
      dimensions: "30 inches x 18 inches",
      weight: "2.5 kg",
      madeIn: "India",
      care: "Hose off to clean",
    },
  },
]

export function getProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}
