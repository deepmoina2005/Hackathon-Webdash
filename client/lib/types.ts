export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  materialType: string
  category: string
  carbonFootprint: number
  featured?: boolean
  details?: {
    dimensions?: string
    weight?: string
    madeIn?: string
    care?: string
  }
}
