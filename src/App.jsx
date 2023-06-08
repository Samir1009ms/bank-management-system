import './App.scss';
import { Navbar } from './shared/navbar/navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthService } from './services/auth.services';
import { useEffect } from 'react';
import { HomeHeader } from './components/home_header/homeHeader';
function App() {
  // const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate()
  // window.location.reload()
  // 
  // useEffect(() => {

  //   if (!currentUser) {
  //     // window.location.href = '/login';
  //     // console.log(currentUser);
  //     navigate('/login')
  //     // console.log("s");

  //   } else {
  //     // console.log(currentUser);

  //   }
  // }, [])

  async function isLogged() {
    
    try{
      await AuthService.getCurrentUser()
    }catch{
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
