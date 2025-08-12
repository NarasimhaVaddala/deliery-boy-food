import { ListOrdered } from "lucide-react";
import React from "react";

export default function OrderItem({ order, accept, reject }) {
  const { _id, user } = order;

  // Destructure address fields with fallbacks
  const {
    housenumber = "",
    street = "",
    city = "",
    pincode = "",
  } = user?.address || {};

  // Construct full address line
  const fullAddress =
    [housenumber, street].filter(Boolean).join(", ") +
    ",\n" +
    [city, pincode].filter(Boolean).join(" ");

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 mb-4 hover:shadow transition-shadow duration-200">
      {/* Order Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Order #{_id?.slice(-4).toUpperCase() || "N/A"}
        </h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {order.items?.length || 2} item(s)
        </span>
      </div>

      {/* Customer Info */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Deliver to:</p>
        <p className="font-medium text-gray-900">{user?.name || "Customer"}</p>
        <p className="text-sm text-gray-700 mt-1 font-normal whitespace-pre-line">
          {fullAddress}
        </p>
      </div>

      {/* Distance & ETA (can be dynamic later) */}
      <div className="flex items-center gap-2 text-sm text-blue-600 mb-4">
        <ListOrdered />
        {order.distance ? `${order.distance}` : ""} away •{" "}
        {order.eta ? `${order.eta} min` : ""} drive
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 text-center">
          Reject
        </button>
        <button className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 text-center">
          Accept
        </button>
      </div>
    </div>
  );
}
