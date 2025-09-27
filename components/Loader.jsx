import React from "react";
import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-50">
      <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
    </div>
  );
}
