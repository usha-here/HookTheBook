import React from 'react'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='h-[75vh] flex flex-col md:flex-row justify-center'>
    <div className="bg-[url('https://wallpaperaccess.com/full/922690.jpg')] h-96 w-full bg-cover bg-center p-20">
    <div className=' w-full mb:12 lg:w-3/6 flex flex-col items-start lg:items-start justify-center'>
    <h2 className='text-4xl lg:text-5xl font-bold text-teal-900 text-center lg:text-left'>
        Discover Your Next Great Read 
        </h2>
        <p className='mt-5 text-xl text-black font-semibold'>
        Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books
        </p><br></br>
        <Link to="/all-books"
         className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow
          px-8 py-2 hover:bg-zinc-800 rounded-full'>
            Discover Here
          </Link>
        </div>
        </div>
        </div>
  );};
  export default Hero;