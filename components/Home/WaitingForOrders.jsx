import { Timer } from "lucide-react";

export default function WaitingForOrders() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <div className="mb-6 flex items-center justify-center">
          <Timer size={30} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Waiting for Orders
        </h2>
        <p className="text-gray-600 mb-6">
          There are no orders at the moment. We'll notify you as soon as a new
          order comes in.
        </p>
        <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
          Monitoring for new orders...
        </div>
      </div>
    </div>
  );
}
