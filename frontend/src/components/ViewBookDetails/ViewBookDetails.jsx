import React, { useEffect,useState} from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";

const ViewBookDetails=()=>{
    const { id }=useParams();
    const [Data,setData]=useState();
    useEffect(()=>{
        const fetch =async()=>{
          const response = await axios.get(
            `http://localhost:1000/ap1/v1/get-book/${id}`
        );
        console.log(response);
          setData(response.data.data);
        };
        fetch();
    },[]);
    return(
   <>
   {Data && (
     <div className="px-8 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8">
     <div className="bg-zinc-800 rounded p-4 h-[70vh] lg:h-[88vh] w-full lg:w-3/6 flex  items-center justify-center">
     {' '}
     <img src={Data.url} alt='/' className='h-[50vh] lg:h-[70vh]'/>
     </div>
     <div className="p-4 w-full lg:w-3/6">
     <h1 className='text-4xl text-zinc-300 font-semibold'>
        {Data.title}
        </h1>
     <p className='text-zinc-400 mt-1'>by {Data.author}</p>
     <p className='text-zinc-500 mt-4 text-xl'>{Data.desc}</p>
     <p className='flex mt-4 items-center justify-start text-zinc-400'>
         <GrLanguage className='me-3'/>{Data.language}
         </p>
         <p className='text-zinc-100 text-3xl font-semibold mt-4'>
             Price : Rs {Data.price}{' '}
             </p>
     </div>
     </div>
   ) }
   {!Data && (<div className='h-screen bg-zinc-900 flex items-center justify-center'>
    <Loader/>{' '}
    </div>
)}
   </>
    );
};

export default ViewBookDetails;