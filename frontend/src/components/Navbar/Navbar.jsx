import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {FaGripLines} from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const links=[
    {
      title:'Home',
      link:'/',
    },
    
    {
      title:'All Books',
      link:'/all-books',
    },
    {
      title:'Cart',
      link:'/cart',
    },
    {
      title:'Profile',
      link:'/profile',
    },
  ];
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  if(isLoggedIn===false){
    links.splice(2,2);
  }
  // for the navbar icon hidden state
  const [Mobnav,setMobnav]=useState("hidden")         //by default is hidden
   return (
    <>
    <nav className='z-50 relative flex bg-black text-white px-8 py-4 items-center justify-between'>
      <Link to ="/" className='flex items-center'>
        <img 
        className='h-10 me-2'src='https://th.bing.com/th/id/OIP.25N826BC1Yy3S1zAUsMn9gD6D6?w=512&h=512&rs=1&pid=ImgDetMain' alt='logo'/>
        <h1 className='text-2xl font-bold'>HookTheBook</h1>
      </Link>
      <div className='nav-links-hookthebook md:flex items-center gap-4 '>
        <div className='hidden md:flex gap-4'>
          {links.map((items,i)=>(
          <Link to={items.link}
           className='hover:text-blue-500 transition-all-duration-300' 
          key={i}>
            {items.title}{" "}
            </Link>))}
          </div>
          <div className='hidden md:flex gap-4'>
            <Link to ="/LogIn" 
            className='px-3 py-1 border border-blue-500 rounded-2xl hover:bg-white hover:text-zinc-800 transition-duration-300'>LogIn</Link>
            <Link to="/SignUp" className='px-3 py-1 bg-blue-500 rounded-2xl hover:bg-white hover:text-zinc-800 transition-duration-300'>SignUp</Link>
          
          
          </div>
          <button className='block md:hidden text-white text-2xl hover:text-zinc-400' 
          onClick={()=>(
            Mobnav=== "hidden"
            ? setMobnav("block")
            :setMobnav("hidden"))}>
            <FaGripLines/>
          </button>
        </div>
    </nav>
    <div 
    className={`${Mobnav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
    {links.map((items,i)=>(
          <Link 
          to={items.link}
          className={`${Mobnav} mb-8 text-white text-2xl hover:text-blue-500 font-semibold transition-all-duration-300`} 
          key={i}
            
            onClick={()=>
              (Mobnav=== "hidden"
              ? setMobnav("block")
              :setMobnav("hidden"))}
>
          {items.title}{" "}
            </Link>))}

            <Link to ="/LogIn" 
            className={`${Mobnav} mb-8 text-2xl text-semibold px-3 py-1 border border-blue-500 text-white rounded-2xl hover:bg-white hover:text-zinc-800 transition-duration-300`}>LogIn</Link>
            <Link to="/SignUp" 
            className={`${Mobnav} mb-8 text-2xl text-semibold px-3 py-1 bg-blue-500 rounded-2xl text-white hover:bg-white hover:text-zinc-800 transition-duration-300`}>SignUp</Link>
          </div> {/*z index 40 so that it can go back     mb-margin bottom*/}
    </>

  )
}

export default Navbar