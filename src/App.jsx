import { Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/Signup";
import UnderVerification from "./screens/UnderVerification";
import { ToastContainer } from "react-toastify";
import Home from "./screens/Home";
import Layout from "./Layout/Layout";
import GoogleMapLocationPicker from "./screens/GoogleMap";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/under-verification" element={<UnderVerification />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<GoogleMapLocationPicker />} />
        </Route>
      </Routes>
    </>
  );
}
