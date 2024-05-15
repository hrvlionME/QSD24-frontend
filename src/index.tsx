import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import NavbarPage from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import ShopPage from "./pages/ShopPage/ShopPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";


import './index.css';
import './colors.css'
import Faq from './pages/FAQ/Faq';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/faq" element={ <Faq /> } />
          <Route path="/shop/:category/:id" element={<ShopPage />} />
        </Route>
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
      <Outlet />
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
