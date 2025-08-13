export const sendCurrentLocation = (socket, id) => {
  if (!socket) return;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log("Sending location:", { latitude, longitude, orderId: id });

      socket.emit("partner-location", {
        latitude,
        longitude,
        timestamp: new Date().toISOString(),
        orderId: id,
      });
    },
    (error) => {
      console.error("Error getting location:", error);
      // Optionally: emit error or retry
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
  );
};
