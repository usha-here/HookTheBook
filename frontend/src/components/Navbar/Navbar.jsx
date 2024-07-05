import React from 'react'

const Navbar = () => {
  const links=[
    {
      title:'Home',
      link:'/',
    },
    {
      title:'About Us',
      link:'/about-us',
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
  ]
  return (
    <div className='flex bg-black text-white px-8 py-4 items-center justify-between'>
      <div className='flex items-center'>
        <img 
        className='h-10 me-2'src='https://th.bing.com/th/id/OIP.25N826BC1Yy3S1zAUsMn9gD6D6?w=512&h=512&rs=1&pid=ImgDetMain' alt='logo'/>
        <h1 className='text-2xl font-bold'>HookTheBook</h1>
      </div>
      <div className='nav-links-hookthebook flex items-center gap-4 '>
        <div className='flex gap-4'>
          {links.map((items,i)=>(
          <div className='hover:text-blue-500 transition-all-duration-300' 
          key={i}>
            {items.title}{" "}
            </div>))}
          </div>
          <div className='flex gap-4'>
            <button className='px-2 py-1 border border-blue-500 rounded-2xl hover:bg-white hover:text-zinc-800 transition-duration-300'>LogIn</button>
            <button className='px-2 py-1 bg-blue-500 rounded-2xl hover:bg-white hover:text-zinc-800 transition-duration-300'>SignUp</button>
          
          
          </div>
        </div>
    </div>
  )
}

export default Navbar