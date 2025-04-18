"use client"

import { useEffect, useState } from "react"
import { Leaf } from "lucide-react"

export function ImpactCounter() {
  const [count, setCount] = useState({
    carbon: 0,
    water: 0,
    waste: 0,
    orders: 0,
  })

  useEffect(() => {
    // Simulate increasing counters
    const interval = setInterval(() => {
      setCount((prev) => ({
        carbon: Math.min(prev.carbon + 0.1, 2500),
        water: Math.min(prev.water + 10, 10000),
        waste: Math.min(prev.waste + 0.5, 5000),
        orders: Math.min(prev.orders + 1, 1200),
      }))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-1 text-green-700 dark:text-green-300">
          <Leaf className="h-5 w-5" />
          <span className="text-2xl font-bold">{count.carbon.toFixed(1)}+</span>
        </div>
        <p className="text-sm text-muted-foreground">kg of CO₂ saved</p>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-1 text-blue-700 dark:text-blue-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
          </svg>
          <span className="text-2xl font-bold">{Math.floor(count.water)}+</span>
        </div>
        <p className="text-sm text-muted-foreground">liters of water saved</p>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-1 text-amber-700 dark:text-amber-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
          <span className="text-2xl font-bold">{count.waste.toFixed(0)}+</span>
        </div>
        <p className="text-sm text-muted-foreground">kg of waste diverted</p>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-1 text-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span className="text-2xl font-bold">{Math.floor(count.orders)}+</span>
        </div>
        <p className="text-sm text-muted-foreground">happy customers</p>
      </div>
    </div>
  )
}
