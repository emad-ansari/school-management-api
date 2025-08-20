import { MapPin, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function SchoolResults({ results, userLocation }) {
  if (!results || results.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <MapPin className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>No schools found in your area.</p>
            <p className="text-sm">Try adjusting your location or adding schools to the database.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span>
          Showing {results.length} school{results.length !== 1 ? 's' : ''} near your location
        </span>
      </div>

      <div className="space-y-3">
        {results.map((school, index) => (
          <Card key={school.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {index + 1}. {school.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {school.address}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Navigation className="h-4 w-4 text-primary" />
                    <span className="font-medium text-primary">
                      {school.distance} km
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {school.latitude.toFixed(6)}, {school.longitude.toFixed(6)}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {userLocation && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>
              Your location: {userLocation.latitude.toFixed(6)}, {userLocation.longitude.toFixed(6)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
