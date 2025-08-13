import { useEffect, useState } from "react";
import { showAxiosError } from "../core/toast";
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
      const resp = await API.get("/partner/all-orders");
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
      playNotificationSound();
    });

    return () => socket.off("new-delivery");
  }, [socket]);

  return { orders, openOrderPopup, setOrderPopup, completeOrder };
};
