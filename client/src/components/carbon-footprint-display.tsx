import { Leaf } from "lucide-react"

interface CarbonFootprintDisplayProps {
  carbonSaved: number
  title?: string
  showEquivalent?: boolean
}

export default function CarbonFootprintDisplay({
  carbonSaved,
  title = "Carbon Footprint Saved",
  showEquivalent = true,
}: CarbonFootprintDisplayProps) {
  return (
    <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
      <h3 className="text-sm font-medium text-green-800 dark:text-green-300 mb-2">{title}</h3>
      <div className="flex items-center gap-2">
        <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
        <span className="text-lg font-bold text-green-700 dark:text-green-300">{carbonSaved.toFixed(1)} kg CO₂</span>
      </div>
      {showEquivalent && (
        <div className="mt-2 text-sm text-green-700 dark:text-green-400">
          <p>Equivalent to:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>{(carbonSaved * 4).toFixed(1)} km not driven by car</li>
            <li>{(carbonSaved * 30).toFixed(0)} smartphone charges</li>
            {carbonSaved >= 10 && <li>{(carbonSaved / 22).toFixed(1)} trees planted for a year</li>}
          </ul>
        </div>
      )}
    </div>
  )
}
