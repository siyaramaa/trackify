import Image from 'next/image'
import React from 'react'

function page() {
  return (
    <div className="flex  h-full flex-1 items-center justify-center text-white ">
                <div className='h-[95vh] w-[80vw] border bg-slate-800 rounded-xl text-center p-4 space-y-5'>
                        <Image loading="lazy" width={150} height={150} className={`nextImg w-[85px] h-[85px] mx-auto rounded-full object-cover bg-white`} alt="userIntial" src={'/image/krishna.avif'} />
                        <div className='border flex flex-col justify-evenly h-[70vh] w-[73vw] rounded-lg bg-slate-300 text-black'>
                                <div className='userInfo'>
                             <h1 className='username'>Name: Radheshyam</h1>

                            
                            <p className='email'>
                             Email: Radhe@krishna.com
                            </p>
                            <p className='createdAccount'>
                             Started: June 19th, 2023
                            </p>
                                </div>
                                <div className='flex  w-full justify-around'>
                            <button className="p-3 bg-red-500  rounded hover:bg-cyan-200 transition-all ease-in">Delete Account</button>
                            <button className="p-3 bg-cyan-500 rounded hover:bg-cyan-200 transition-all ease-in">Change Avatar</button>
                                </div>


                        </div>
                </div>
        
    </div>
  )
}

export default page