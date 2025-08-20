import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Plus, Loader2 } from "lucide-react"

export function AddSchoolForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    schoolName: "",
    address: "",
    latitude: "",
    longitude: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Adding school:", formData)
    setIsLoading(false)

    // Reset form
    setFormData({
      schoolName: "",
      address: "",
      latitude: "",
      longitude: "",
    })
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="schoolName" className="text-sm font-medium text-foreground">
          School Name
        </Label>
        <Input
          id="schoolName"
          type="text"
          placeholder="Enter school name"
          value={formData.schoolName}
          onChange={(e) => handleInputChange("schoolName", e.target.value)}
          className="bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium text-foreground">
          Address
        </Label>
        <Textarea
          id="address"
          placeholder="Enter complete school address"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          className="bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent min-h-[80px] resize-none"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="latitude" className="text-sm font-medium text-foreground">
            Latitude
          </Label>
          <Input
            id="latitude"
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
          <Label htmlFor="longitude" className="text-sm font-medium text-foreground">
            Longitude
          </Label>
          <Input
            id="longitude"
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
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding School...
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            Add School
          </>
        )}
      </Button>
    </form>
  )
}
