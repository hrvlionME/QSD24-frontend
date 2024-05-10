import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignupPage/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import './colors.css';


import './index.css';
import './colors.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/signup" element={ <SignUpPage /> } />
        <Route path="/forgot-password" element={ <ForgotPasswordPage /> } />
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
