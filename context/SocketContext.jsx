// contexts/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider = ({
  children,
  serverUrl = "http://localhost:5000",
}) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    const newSocket = io(serverUrl);

    newSocket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to server");

      newSocket.emit("role", { role: "delivery", userId: profile?._id });
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from server");
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [profile]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
