import React from 'react'
import { ToastContainer, toast } from "react-toastify";
dynamic(() => import('react-toastify/dist/ReactToastify.min.css'));
import { useGlobalContext } from '@/context/GlobalContext';
import dynamic from 'next/dynamic';

const CurrencyRupeeIcon = dynamic(() => import('@mui/icons-material/CurrencyRupee'));
const MoneyOffIcon = dynamic(() => import('@mui/icons-material/MoneyOff'));
const DeleteOutlineIcon = dynamic(() => import('@mui/icons-material/DeleteOutline'));



function Card({income, id,title,amount, category, createdAt}) {
    const GlobalContext = useGlobalContext();
    const {deleteReq} = GlobalContext;
    
    const delHandler = async (id) => {
        const delRequest = await deleteReq(income, id);
        if(delRequest.error) return toast.error(delRequest.error);
        if(delRequest.success) return toast.info('Deleted Successfully.');
        
      }

  return (
    <div key={id} className="relative">
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

 <div className="bg-white h-20 md:h-24 flex items-center  justify-around lg:p-4 rounded-lg">
{
    income ? <CurrencyRupeeIcon  className="hidden lg:block" fontSize="medium" /> : <MoneyOffIcon  className="hidden lg:block" fontSize="medium" />
}


<div className="details text-xs md:text-sm lg:text-base p-2 font-bold lg:font-medium">

<h1>{title.length >= 10 ? title.slice(0,10)+'...' : title}</h1>
<h1 className={` text-${!income ? 'red-500' : 'green-500'}`}>{`${income ? '+':'-'}NPR ${amount}`}</h1>
</div>
<div className="details text-xs md:text-sm p-2">
<h1 className=" text-gray-500">{category}</h1>
<h1 className="font-medium text-gray-400">{createdAt.slice(0,10)}</h1>
</div>

<button onClick={() => delHandler(id)} className="hover:text-red-500  group h-full p-2" >
<DeleteOutlineIcon className="text-3xl lg:text-4xl" />
<span className="absolute  hidden group-hover:block bg-gray-900 rounded p-1 opacity-40 text-white">Delete</span>
</button>

</div>
   
</div>
  )
}

export default Card