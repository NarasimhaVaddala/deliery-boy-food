import React from "react";
import WaitingForOrders from "../../components/Home/WaitingForOrders";

import OrderItem from "../../components/Home/OrderItem";
import { useOrdersHook } from "../../Hooks/useOrdersHook";
import OrderItemsModal from "../../components/Home/OrderPopup";
import Loader from "../../components/Loader";

export default function Home() {
  const { orders, openOrderPopup, setOrderPopup, completeOrder, loading } =
    useOrdersHook();

  if (loading) {
    return <Loader />;
  }

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
                completeOrder={() => completeOrder(e._id)}
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
