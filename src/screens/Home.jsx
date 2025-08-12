import React from "react";
import WaitingForOrders from "../../components/Home/WaitingForOrders";
// import { useOrdersHook } from "../../Hooks/OrdersHook";
import OrderItem from "../../components/Home/OrderItem";

export default function Home() {
  // const { orders } = useOrdersHook();

  return (
    <div>
      {/* <WaitingForOrders /> */}
      <OrderItem
        order={{
          _id: "ORD1024",
          user: {
            name: "Sarah Johnson",
            address: {
              housenumber: "123",
              street: "Maple Street, Apt 4B",
              city: "Brooklyn",
              pincode: "NY 11201",
            },
          },
        }}
      />
    </div>
  );
}
