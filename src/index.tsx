import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavbarPage from "./pages/NavbarPage/NavbarPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";

import "./index.css";
import "./colors.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function Main() {
  // Custom hook to get the current location
  const location = useLocation();

  // Determine if the current page is one of the auth pages
  const isAuthPage = ["/login", "/signup", "/forgot-password"].includes(
    location.pathname
  );

  return (
    <>
      {!isAuthPage && <NavbarPage />}
      <HomePage />
    </>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
