import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Theme } from './components/theme/theme';
import Login from './pages/login/login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <Routes>
   <Route exact path='/login' element={<Login></Login>} />
    <Route path="/" exact element={<App/>}>
      <Route  />
    </Route>
   </Routes>
  
  </BrowserRouter>
);  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
