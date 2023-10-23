import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import { AuthProvider } from './hooks/providers/AuthProvider';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ForgotPasswordView from './views/forgotPasswordView/ForgotPasswordView';
import HomePageView from './views/homePageView/HomePageView';
import InsertCodeView from './views/insertCodeView/insertCodeView';
import LoginView from './views/loginView/LoginView';
import MfaView from './views/mfaView/MfaView';
import NewPasswordView from './views/newPasswordView/newPasswordView';
import RegisterView from './views/registerView/RegisterView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route index element={<LoginView />} />
        <Route path="login" element={<LoginView />} />
        <Route path="mfa" element={<MfaView />} />
        <Route path="register" element={<RegisterView />} />
        <Route path="forgotPassword" element={<ForgotPasswordView />} />
        <Route path="home" element={<HomePageView />} />
        <Route path="code" element={<InsertCodeView />} />
        <Route path="newPassword" element={<NewPasswordView />} />
      </Routes>
      <ToastContainer
        theme='colored'
        autoClose={2000}
        transition={Zoom}
        newestOnTop />
    </AuthProvider>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
