import { Locate, Search } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const GoogleMapLocationPicker = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [address, setAddress] = useState("");
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your actual Google Maps API key
  const API_KEY = "AIzaSyCNMAEsU6BwMrrXQRvAHw42i7gd8m6zv2g";

  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src*="${API_KEY}"]`);
    if (existingScript) {
      // Script already loaded, initialize map
      if (window.google && window.google.maps) {
        initMap();
      } else {
        // Wait for the existing script to fully load
        existingScript.addEventListener("load", initMap);
      }
    } else {
      loadGoogleMapsScript();
    }

    // Cleanup function
    return () => {
      // Remove event listener if needed
      const script = document.querySelector(`script[src*="${API_KEY}"]`);
      if (script) {
        script.removeEventListener("load", initMap);
      }
    };
  }, []);

  const loadGoogleMapsScript = () => {
    // Prevent multiple script loading
    const scriptId = "google-maps-script";
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log("Google Maps script loaded successfully");
      initMap();
    };

    script.onerror = () => {
      setError(
        "Failed to load Google Maps. Please check your API key and internet connection."
      );
      setIsLoading(false);
    };

    document.head.appendChild(script);
  };

  const initMap = () => {
    try {
      // Default to center of the US
      const defaultCenter = { lat: 39.8283, lng: -98.5795 };

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 4,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      setMap(mapInstance);

      // Use AdvancedMarkerElement instead of deprecated Marker
      let markerInstance;
      if (
        window.google.maps.marker &&
        window.google.maps.marker.AdvancedMarkerElement
      ) {
        // Use AdvancedMarkerElement (recommended)
        markerInstance = new window.google.maps.marker.AdvancedMarkerElement({
          map: mapInstance,
          position: defaultCenter,
          gmpDraggable: true, // Note: gmpDraggable instead of draggable
          content: createMarkerContent(),
        });

        // Add drag event listeners for AdvancedMarkerElement
        ["drag", "dragend"].forEach((event) => {
          markerInstance.addListener(event, () => {
            if (markerInstance.position) {
              updateLocation(
                markerInstance.position.lat,
                markerInstance.position.lng
              );
            }
          });
        });
      } else {
        // Fallback to traditional Marker
        markerInstance = new window.google.maps.Marker({
          map: mapInstance,
          draggable: true,
          position: defaultCenter,
        });

        // Update coordinates when marker is dragged
        markerInstance.addListener("dragend", () => {
          const position = markerInstance.getPosition();
          updateLocation(position.lat(), position.lng());
        });
      }

      setMarker(markerInstance);

      // Click on map to set marker
      mapInstance.addListener("click", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        if (
          window.google.maps.marker &&
          window.google.maps.marker.AdvancedMarkerElement
        ) {
          // For AdvancedMarkerElement
          markerInstance.position = { lat, lng };
        } else {
          // For traditional Marker
          markerInstance.setPosition({ lat, lng });
        }

        updateLocation(lat, lng);
      });

      // Try to get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            mapInstance.setCenter(userLocation);
            mapInstance.setZoom(15);

            if (
              window.google.maps.marker &&
              window.google.maps.marker.AdvancedMarkerElement
            ) {
              markerInstance.position = userLocation;
            } else {
              markerInstance.setPosition(userLocation);
            }

            updateLocation(userLocation.lat, userLocation.lng);
            setIsLoading(false);
          },
          (error) => {
            console.warn("Error getting location:", error);
            setIsLoading(false);
          }
        );
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      setError("Error initializing map: " + err.message);
      setIsLoading(false);
    }
  };

  // Create custom marker content for AdvancedMarkerElement
  const createMarkerContent = () => {
    const markerDiv = document.createElement("div");
    markerDiv.innerHTML = `
      <div style="
        background-color: #4285F4;
        border: 2px solid white;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      "></div>
    `;
    return markerDiv;
  };

  const updateLocation = async (lat, lng) => {
    setCoordinates({ lat, lng });

    console.log("COORDINATES", lat, lng);

    // Reverse geocode to get address
    try {
      const geocoder = new window.google.maps.Geocoder();
      const result = await geocoder.geocode({ location: { lat, lng } });

      if (result.results[0]) {
        setAddress(result.results[0].formatted_address);
      }
    } catch (err) {
      console.warn("Error getting address:", err);
    }
  };

  const handleSearch = () => {
    if (!window.google || !window.google.maps) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results[0] && map && marker) {
        const location = results[0].geometry.location;
        map.setCenter(location);
        map.setZoom(15);

        if (
          window.google.maps.marker &&
          window.google.maps.marker.AdvancedMarkerElement
        ) {
          marker.position = location;
        } else {
          marker.setPosition(location);
        }

        updateLocation(location.lat(), location.lng());
      } else {
        alert("Location not found: " + status);
      }
    });
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          if (map && marker) {
            map.setCenter({ lat, lng });
            map.setZoom(15);

            if (
              window.google.maps.marker &&
              window.google.maps.marker.AdvancedMarkerElement
            ) {
              marker.position = { lat, lng };
            } else {
              marker.setPosition({ lat, lng });
            }

            updateLocation(lat, lng);
          }
        },
        (error) => {
          alert("Error getting current location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg border border-red-200">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 sm:h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-lg">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-700 font-medium">Loading map...</span>
          </div>
        </div>
      )}

      {/* Search and controls */}
      <div className="absolute top-4 left-4 right-4 z-10 max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2 bg-white rounded-lg shadow-md p-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search location..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Search />
            Search
          </button>
          <button
            onClick={handleUseCurrentLocation}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Locate />
            Current
          </button>
        </div>
      </div>

      {/* Map container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Results display */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          Selected Location
        </h3>

        {coordinates ? (
          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <span className="font-medium text-gray-700 min-w-20">
                Coordinates:
              </span>
              <span className="text-gray-600">
                {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
              </span>
            </div>
            <div className="flex items-start">
              <span className="font-medium text-gray-700 min-w-20">
                Address:
              </span>
              <span className="text-gray-600 break-words">
                {address || "Loading address..."}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            Click on the map or search for a location
          </p>
        )}
      </div>
    </div>
  );
};

export default GoogleMapLocationPicker;
