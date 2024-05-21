import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignupPage/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import './index.css';
import './colors.css'
import Faq from './pages/FAQ/Faq';
import ContactUs from './pages/ContactUsPage/ContactUs';
import { Provider } from 'react-redux';
import store from './redux/store';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import TwoFA from './pages/TwoFA/TwoFA';
import UPFavoritesPage from './pages/UserPanel/UPFavoritesPage/UPFavoritesPage';
import UPUserDataPage from './pages/UserPanel/UPUserDataPage/UPUserDataPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/signup" element={ <SignUpPage /> } />
          <Route path="/forgot-password" element={ <ForgotPasswordPage /> } />
          <Route path="/sendCode" element={ <TwoFA /> } />
          <Route path="/contact-us" element={ <ContactUs /> }></Route>
          <Route path="/faq" element={ <Faq /> } />
          <Route path="/shop/favorites/:id" element={ <FavoritesPage /> } />
          <Route path="/profile" element={ <UPUserDataPage /> } />
          <Route path="/profile/favorites" element={ <UPFavoritesPage /> } />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(

    <App />

);
