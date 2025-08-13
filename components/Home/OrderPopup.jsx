import { X } from "lucide-react";
import CustomButton from "../CustomButton";

export default function OrderItemsModal({ order, onClose }) {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-lg flex-shrink-0">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
          <Header onClose={onClose} />

          <div className="max-h-96 overflow-y-auto p-4 space-y-4">
            {order?.items?.map((e, index) => {
              return <OrderItem item={e} key={index} />;
            })}
          </div>

          <Footer order={order} />
        </div>
      </div>
    </div>
  );
}

function Header({ onClose }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-white">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Order Items</h3>
        <button
          onClick={onClose}
          className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition"
        >
          <X size={20} />
        </button>
      </div>
      <p className="text-blue-100 text-sm mt-1">View items in this order</p>
    </div>
  );
}

function Footer({ order }) {
  return (
    <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-right">
      <p className="text-sm font-semibold text-slate-800">
        Total: ₹{order?.totalPrice?.toFixed(2) || "0.00"}
      </p>
    </div>
  );
}

function OrderItem({ item }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Left: Image */}
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={item?.images[0]}
          alt={item?.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right: Content */}
      <div className="flex-1 min-w-0">
        {/* Name */}
        <h3 className="text-sm font-bold text-slate-800 truncate">
          {item?.name}
        </h3>

        {/* Description */}
        {item.description && (
          <p className="text-xs text-slate-600 mt-1 line-clamp-2">
            {item?.description || "aljdl"}
          </p>
        )}

        {/* Price and Quantity */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-semibold text-slate-900">
            ₹{item?.price?.toFixed(2)}
          </span>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            Qty: {item?.qty}
          </span>
        </div>
      </div>
    </div>
  );
}
