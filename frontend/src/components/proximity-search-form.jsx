import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Search, Loader2, MapPin } from "lucide-react"

export function ProximitySearchForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Searching schools near:", formData)
    setIsLoading(false)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="userLatitude" className="text-sm font-medium text-foreground">
            Your Latitude
          </Label>
          <Input
            id="userLatitude"
            type="number"
            step="any"
            placeholder="0.000000"
            value={formData.latitude}
            onChange={(e) => handleInputChange("latitude", e.target.value)}
            className="bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="userLongitude" className="text-sm font-medium text-foreground">
            Your Longitude
          </Label>
          <Input
            id="userLongitude"
            type="number"
            step="any"
            placeholder="0.000000"
            value={formData.longitude}
            onChange={(e) => handleInputChange("longitude", e.target.value)}
            className="bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent"
            required
          />
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={getCurrentLocation}
        className="w-full border-border hover:bg-accent/10 text-foreground bg-transparent"
      >
        <MapPin className="mr-2 h-4 w-4" />
        Use Current Location
      </Button>

      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium py-2.5"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Searching...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Find Schools
          </>
        )}
      </Button>
    </form>
  )
}
