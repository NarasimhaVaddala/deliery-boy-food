import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchUserProfile } from "../../Redux/Slices/ProfileSlice";

export default function UnderVerification() {
  const { profile } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  console.log(profile);

  if (profile?.approved) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8 text-center font-sans">
      {/* Circular Image Container */}
      <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden mb-8 shadow-lg transform transition duration-300 hover:scale-105">
        <img
          src="/under-verify.jpg"
          alt="Document verification"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
        Your Documents Are Under Verification
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-md md:max-w-lg leading-relaxed">
        Thank you for submitting your documents. Our team is currently reviewing
        your information. You will receive a notification once the verification
        process is complete.
      </p>

      {/* Status Badge */}
      <div className="px-6 py-3 bg-blue-500 text-white rounded-full text-sm sm:text-base font-medium shadow-md transform transition duration-300 hover:bg-blue-600">
        Processing typically takes 24-48 hours
      </div>

      {/* Optional loading animation */}
      <div className="flex space-x-2 mt-8">
        <div
          className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
    </div>
  );
}
