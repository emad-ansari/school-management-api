import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Search, Loader2, MapPin, AlertCircle } from "lucide-react"
import { apiService } from "../services/api"
import { SchoolResults } from "./school-results"

export function ProximitySearchForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchResults, setSearchResults] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSearchResults(null)

    try {
      const result = await apiService.getSchoolsByProximity(
        parseFloat(formData.latitude),
        parseFloat(formData.longitude)
      )
      
      setSearchResults(result.schools)
      setUserLocation(result.userLocation)
    } catch (error) {
      setError(error.message || 'Failed to fetch schools')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toString()
          const lon = position.coords.longitude.toString()
          setFormData({
            latitude: lat,
            longitude: lon,
          })
          setUserLocation({ latitude: parseFloat(lat), longitude: parseFloat(lon) })
        },
        (error) => {
          console.error("Error getting location:", error)
          setError("Failed to get your current location. Please enter coordinates manually.")
        },
      )
    } else {
      setError("Geolocation is not supported by your browser.")
    }
  }

  return (
    <div className="space-y-6">
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

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {/* Results Display */}
      {searchResults && (
        <SchoolResults results={searchResults} userLocation={userLocation} />
      )}
    </div>
  )
}
