import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "../Redux/Store.js";
import { SocketProvider } from "../context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
