import './App.css';
import { Navbar } from './shared/navbar/navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthService } from './services/auth.services';
import { useEffect } from 'react';

function App() {
  const currentUser = AuthService.getCurrentUser();

    const navigate =useNavigate()



  useEffect(()=>{
    if (!currentUser) {
      // window.location.href = '/login';
      // console.log(currentUser);
      navigate('/login')
      console.log("s");
      
    }else{
      console.log(currentUser);
    }
  },[])

  return (
    <>
    <Navbar></Navbar>
    <Outlet></Outlet>
    </>
  );
}

export default App;
