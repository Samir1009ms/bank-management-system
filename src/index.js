import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Theme } from './components/theme/theme';
import Login from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home';
import { Wallet } from './pages/wallet/wallet';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path='/login' element={<Login></Login>} />
      <Route path='/register' element={<Register></Register>} />
      <Route path="/" exact element={<App />}>
        <Route path='/' element={<Home />} />
        <Route path='/wallet' element={<Wallet />} />
      </Route>
    </Routes>

  </BrowserRouter>
);


reportWebVitals();
