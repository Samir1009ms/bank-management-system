import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import { Register } from './pages/register/register';
import Home from './pages/home/home';
import { Wallet } from './pages/wallet/wallet';
import { Provider } from 'react-redux';
import cartStore from './store/store';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18';
import Profile from './pages/profile/Profile';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={cartStore}>
    <I18nextProvider i18n={i18n} >
      <BrowserRouter>
        <Routes>
          <Route exact path='/login' element={<Login></Login>} />
          <Route path='/register' element={<Register></Register>} />
          <Route path="/" exact element={<App />}>
            <Route path='/' element={<Home />} />
            <Route path='/wallet' element={<Wallet />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  </Provider>
  // </React.StrictMode> 
);

reportWebVitals();
