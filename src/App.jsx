import './App.scss';
import { Navbar } from './shared/navbar/navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthService } from './services/auth.services';
import { useEffect } from 'react';
import { HomeHeader } from './components/home_header/homeHeader';
// import 'react-credit-cards-2/dist/es/styles-compiled.css';

import axios from 'axios';
function App() {
  const navigate = useNavigate()

  async function isLogged() {
    try {
      await AuthService.getCurrentUser()
    } catch {
      navigate('/login')
    }
    return
  }

  useEffect(() => {
    isLogged()
  }, [])
  return (
    <>
      <Navbar></Navbar>
      <div className={`flex w-10 flex-column container`}>
        <HomeHeader></HomeHeader>
        <Outlet></Outlet>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
