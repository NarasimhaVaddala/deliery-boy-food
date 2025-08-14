import { useEffect, useState } from "react";
import {
  showAxiosError,
  showInfoMessage,
  showSuccessMessage,
} from "../core/toast";
import { API } from "../core/url";
import { useSocket } from "../context/SocketContext";
import { sendCurrentLocation } from "../utils/GetCurrentlocation";
import { useSelector } from "react-redux";

export const useOrdersHook = () => {
  const [orders, setOrders] = useState([]);
  const [openOrderPopup, setOrderPopup] = useState(false);
  const [completedImage, setCompletedImage] = useState(null);

  const { profile } = useSelector((state) => state.profile);

  const playNotificationSound = () => {
    const audio = new Audio("/sounds/notification.mp3");
    audio.volume = 0.5;
    audio.play().catch((error) => console.warn("Failed to play sound:", error)); // Handle autoplay policy
  };

  const { socket } = useSocket();

  const getAllOrders = async () => {
    try {
      const resp = await API.get("/partner/all-orders", {
        params: {
          status: "accepted",
        },
      });
      console.log(resp.data);

      setOrders(resp.data, "--------------------orders");
    } catch (error) {
      showAxiosError(error);
    }
  };

  const completeOrder = () => {};

  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    if (socket && orders?.length) {
      const intervalId = setInterval(() => {
        sendCurrentLocation(socket, orders?.[0]?._id);
      }, 3000);

      sendCurrentLocation(socket);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [socket, orders]);

  useEffect(() => {
    socket.on("new-delivery", ({ message, order, customer, address }) => {
      console.log("NEw deliery");
      getAllOrders();
      showSuccessMessage("New order arrived");
      playNotificationSound();
    });
    socket.on("cancel-order", (data) => {
      console.log("NEw deliery");
      getAllOrders();
      showInfoMessage("Order has been cancelled");
      playNotificationSound();
    });

    return () => {
      socket.off("new-delivery");
      socket.off("cancel-order");
    };
  }, [socket]);

  return { orders, openOrderPopup, setOrderPopup, completeOrder };
};
