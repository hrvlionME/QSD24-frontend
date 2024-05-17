<<<<<<< HEAD
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


=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignupPage/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import './colors.css';
>>>>>>> eac6df6 (qsd-46 rebase)
import './index.css';
import './colors.css'
import Faq from './pages/FAQ/Faq';
import ContactUs from './pages/ContactUsPage/ContactUs';
<<<<<<< HEAD
import { Provider } from 'react-redux';
import store from './redux/store';
=======
>>>>>>> eac6df6 (qsd-46 rebase)

function App() {
  return (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Main />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/contact-us" element={ <ContactUs /> }></Route>
          <Route path="/faq" element={ <Faq /> } />
          <Route path="/shop/:category/:id" element={<ShopPage />} />
        </Route>
=======
        <Route path="/" element={ <HomePage /> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/signup" element={ <SignUpPage /> } />
        <Route path="/forgot-password" element={ <ForgotPasswordPage /> } />
        <Route path="/contact-us" element={ <ContactUs /> }></Route>
        <Route path="/faq" element={ <Faq /> } />
>>>>>>> eac6df6 (qsd-46 rebase)
      </Routes>
    </BrowserRouter>
  </Provider>
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
