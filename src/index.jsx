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
import EditProfile from './components/Profile/EditProfile';
import History from './pages/history/History';
import Card from './pages/card/Card';
import Details from './pages/details/Details';
import Settings from './pages/settings/Settings';

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
            <Route path='/settings' element={<Settings />} />
            <Route path='/history' element={<History />} />
            <Route path='/card' element={<Card />} />
            <Route path='/card/details/:id' element={<Details />} />
            <Route path='/settings/editprofile' element={<EditProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  </Provider>
  // </React.StrictMode> 
);

reportWebVitals();