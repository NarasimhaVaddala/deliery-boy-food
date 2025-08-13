import { useEffect, useState } from "react";
import { showAxiosError } from "../core/toast";
import { API } from "../core/url";

export const useOrdersHook = () => {
  const [orders, setOrders] = useState();
  const [openOrderPopup, setOrderPopup] = useState(false);
  const [completedImage, setCompletedImage] = useState(null);

  const getAllOrders = async () => {
    try {
      const resp = await API.get("/partner/all-orders");
      console.log(resp.data);
      setOrders(resp.data);
    } catch (error) {
      showAxiosError(error);
    }
  };

  const completeOrder = () => {};

  useEffect(() => {
    getAllOrders();
  }, []);

  return { orders, openOrderPopup, setOrderPopup, completeOrder };
};
