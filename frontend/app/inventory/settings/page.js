import Image from 'next/image'
import React from 'react'

function page() {
  return (
    <div className="flex  h-full flex-1 items-center justify-center bg-white">
                <div className='h-[95vh] w-[80vw] border bg-gradient-to-r from-slate-300 to-red-100 rounded-xl text-center p-4 space-y-5'>
                        <Image loading="lazy" width={150} height={150} className={`nextImg w-[85px] h-[85px] mx-auto rounded-full object-cover bg-white`} alt="userIntial" src={'/image/krishna.avif'} />
                        <div className='border flex flex-col justify-evenly h-[70vh] w-[73vw] rounded-lg bg-gradient-to-l from-slate-200 to-teal-100 text-black'>
                                    <h1>User Information</h1>
                                <div className='userInfo border flex flex-col items-center h-[40vh] p-5 space-y-9'>
                             <div className='border rounded-lg bg-slate-200  pl-5 w-[50vw] flex justify-between text-center items-center'>
                                         Name:
                                    <input type="text" className="p-2 bg-gradient-to-r from-slate-100 to-red-100  rounded-r-lg border outline-none" defaultValue={'Radheshyam'} disabled />
                             </div>

                            
                             <div className='border rounded-lg bg-slate-200  pl-5 w-[50vw] flex justify-between text-center items-center'>
                                         Email:
                                    <input type="text" className="p-2 bg-gradient-to-r from-slate-100 to-red-100  rounded-r-lg border outline-none" defaultValue={'Radhe@shyam.com'} disabled />
                             </div>

                             <div className='border rounded-lg bg-slate-200  pl-5 min-w-fit w-[50vw] flex justify-between text-center items-center'>
                                         Created at:
                                    <input type="text" className="p-2 bg-gradient-to-r from-slate-100 to-red-100  rounded-r-lg border outline-none" defaultValue={'19th June, 2023'} disabled />
                             </div>
                                </div>
                                <div className='flex  w-full justify-around'>
                            <button className="p-3 bg-red-300  rounded hover:bg-red-400 transition-all ease-in-out">Delete Account</button>
                            <button className="p-3 bg-cyan-300 rounded hover:bg-cyan-400 transition-all ease-in-out">Change Avatar</button>
                                </div>


                        </div>
                </div>
        
    </div>
  )
}

export default page