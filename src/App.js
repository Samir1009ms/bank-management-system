import './App.css';
import { Navbar } from './shared/navbar/navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthService } from './services/auth.services';
import { useEffect } from 'react';
import { HomeHeader } from './components/home_header/homeHeader';

function App() {
  const currentUser = AuthService.getCurrentUser();

  const navigate = useNavigate()


  // window.location.reload()
  // 
  useEffect(() => {
    if (!currentUser) {
      // window.location.href = '/login';
      // console.log(currentUser);
      navigate('/login')
      // console.log("s");

    } else {
      // console.log(currentUser);

    }
  }, [])

  return (
    <>
      <Navbar></Navbar>
      <div className='flex w-10 flex-column'>
        <HomeHeader></HomeHeader>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
