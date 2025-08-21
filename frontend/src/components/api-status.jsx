import { useState, useEffect } from "react";
import { Wifi, WifiOff, Loader2 } from "lucide-react";
import { apiService } from "../services/api";

export function ApiStatus() {
  const [status, setStatus] = useState("checking"); // "checking", "connected", "disconnected"

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        await apiService.testConnection();
        setStatus("connected");
      } catch (error) {
        setStatus("disconnected");
      }
    };

    checkApiStatus();
  }, []);

  const getStatusDisplay = () => {
    switch (status) {
      case "checking":
        return {
          icon: <Loader2 className="h-4 w-4 animate-spin" />,
          text: "Checking API connection...",
          className: "text-yellow-600 bg-yellow-50 border-yellow-200",
        };
      case "connected":
        return {
          icon: <Wifi className="h-4 w-4" />,
          text: "API Connected",
          className: "text-green-600 bg-green-50 border-green-200",
        };
      case "disconnected":
        return {
          icon: <WifiOff className="h-4 w-4" />,
          text: "API Disconnected",
          className: "text-red-600 bg-red-50 border-red-200",
        };
      default:
        return {
          icon: <WifiOff className="h-4 w-4" />,
          text: "Unknown Status",
          className: "text-gray-600 bg-gray-50 border-gray-200",
        };
    }
  };

  const statusInfo = getStatusDisplay();

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${statusInfo.className}`}>
      {statusInfo.icon}
      {statusInfo.text}
    </div>
  );
}

