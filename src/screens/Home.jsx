import React from "react";
import WaitingForOrders from "../../components/Home/WaitingForOrders";

import OrderItem from "../../components/Home/OrderItem";
import { useOrdersHook } from "../../Hooks/useOrdersHook";
import OrderItemsModal from "../../components/Home/OrderPopup";

export default function Home() {
  const { orders, openOrderPopup, setOrderPopup, completeOrder } =
    useOrdersHook();

  return (
    <div>
      {orders?.length > 0 ? (
        <div>
          {orders?.map((e) => {
            return (
              <OrderItem
                order={e}
                key={e._id}
                setOrderPopup={setOrderPopup}
                completeOrder={completeOrder}
              />
            );
          })}
        </div>
      ) : (
        <WaitingForOrders />
      )}

      {openOrderPopup && (
        <OrderItemsModal
          order={openOrderPopup}
          onClose={() => setOrderPopup(null)}
        />
      )}
    </div>
  );
}
