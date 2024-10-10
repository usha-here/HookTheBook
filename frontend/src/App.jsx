import React,{useEffect} from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import {Routes,Route} from "react-router-dom";
import Aboutus from './pages/Aboutus';
import AllBooks from './pages/AllBooks';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") && 
      localStorage.getItem("token") && 
      localStorage.getItem("role")
) {
  dispatch(authActions.login());
  dispatch(authActions.changeRole(localStorage.getItem("role")));
}
  }, 
  []);
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route  path='/cart' element={<Cart/>}/>
        <Route  path='/profile' element={<Profile/>}/>
        <Route  path='/about-us' element={<Aboutus/>}/>
        <Route  path='/all-books' element={<AllBooks/>}/>
        <Route path='/LogIn' element={<LogIn/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='view-book-details/:id' element={<ViewBookDetails/>}/>
      </Routes>
      <Footer/>
      
      </div>
  )
}

export default App