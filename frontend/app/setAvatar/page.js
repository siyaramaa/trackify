"use client";
//Importing specifically without destructuring frees some space in dev mode.
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { useUserContext } from '@/context/UserContext';
// const useUserContext = dynamic(() => import('@/context/UserContext'));
const Badge = dynamic(() => import('@mui/material/Badge'));
const Stack = dynamic(() => import('@mui/material/Stack'));
const Image = dynamic(() => import('next/image'), {
      ssr: false,
      loading: () => <div className="rounded-full w-[75px] h-[75px] cursor-pointer hover:opacity-50 ease-in animation-all duration-100 animate-pulse bg-slate-600" />
});
dynamic(() => import("react-toastify/dist/ReactToastify.css"));



//Page to set avatar for the user account.
function page() {
  //Using UserContext
  const UserContext = useUserContext();

  //Importing uploadAvatar function from UserContext which uploads the avatar.
  const {uploadAvatar} = UserContext;

  //Initializing useRouter hook to navigate the user.
  const router = useRouter()
  
  //State for user selected avatar
  const [avatar, setAvatar] = useState('');

  //Used incase when user wants to upload the image from his own system storage.
  const userInputHandler = async (e) => {
        //Getting the selected file.
        const selectedImage = e.target.files[0];
        //Converting the selected image file into a base64 url.
        const base64Image = await convertIntoBase64(selectedImage);
        //Notifying user that the avatar has been selected.
        toast.info('Profile Picture Selected.')
        //Changing the state of avatar into the base64 data url.
        setAvatar(base64Image);
}


  //Function to upload the selected avatar to the database.
  const submitHandler = async () => {
      //Calling the function uploadAvatar which sends request to the API.
      const uploadReq = await uploadAvatar(avatar);
      //Incase if avatar does not gets uploaded poping an error message else an sucess message with toastify.
      if(uploadReq?.error) return toast.error("Got Error, Please try again.");
      toast.success('Profile Picture Uploaded.');
      //If image gets uploaded redirecting the user to the home page.
      router.push('/inventory');
  };

  //Function to convert the image to the base64 URL or code.
  function convertIntoBase64(file){

    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result)
        };

        fileReader.onerror = (error) => {
          reject(error)
        };
    })
          
  }

  

  return (
    <>
    <ToastContainer />
      <div className="flex  h-full flex-1 flex-col justify-evenly bg-slate-900 text-white">
        {/* Displaying the selected Avatar */}
        <div className="choosedAvatar sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <input className="selector hidden" type="file" onChange={userInputHandler} />
        <Badge onClick={() => document.querySelector('.selector').click()} overlap="circular" className="cursor-pointer" badgeContent={'+'} color="primary" anchorOrigin={{
          vertical: 'bottom',
    horizontal: 'right',
  }}>
                 <Image loading="lazy" width={150} height={150} className={`nextImg w-[95px] h-[95px] mx-auto rounded-full object-cover bg-white`} alt="Avatar" src={!avatar ? '/image/defaultAvatar.png' : avatar} />

     
        </Badge>
        </div>

        {/* Showing different avatars for users */}
        <div className="avatarSelection sm:mx-auto sm:w-full space-y-5 min-h-fit h-[35vh]">
        <h2 className="text-center text-xl font-bold leading-9 tracking-tight">
                    Select your avatar
          </h2>
             <Stack direction="row" spacing={2} className="flex items-center justify-center">
                <Image loading="lazy" width={150} height={150} onClick={(e) => setAvatar(e.target.src)} className="rounded-full w-[75px] h-[75px] cursor-pointer hover:opacity-50 ease-in animation-all duration-100" alt="Remy Sharp" src="/image/stylish_boy.avif" />
                <Image loading="lazy" width={150} height={150} onClick={(e) => setAvatar(e.target.src)} className="rounded-full w-[75px] h-[75px] cursor-pointer hover:opacity-50 ease-in animation-all duration-100" alt="Travis Howard" src="/image/Yellow_jacket_boy.avif" />
               <Image loading="lazy" width={150} height={150} onClick={(e) => setAvatar(e.target.src)} className="rounded-full w-[75px] h-[75px] cursor-pointer hover:opacity-50 ease-in animation-all duration-100" alt="Cindy Baker" src="/image/Yellow_jacket_girl.avif" />
               <Image loading="lazy" width={150} height={150} onClick={(e) => setAvatar(e.target.src)} className="rounded-full w-[75px] h-[75px] cursor-pointer hover:opacity-50 ease-in animation-all duration-100" alt="Shree Rama"  src={'/image/sitarama.avif'} />             
             </Stack>
             <Stack direction="row" spacing={2} className="flex items-center justify-center">
             <Image loading="lazy" onClick={(e) => setAvatar(e.target.src)} width={150} height={150} className="w-[75px] h-[75px] rounded-full cursor-pointer hover:opacity-50 ease-in animation-all duration-100" alt="Shree Krishna" src="/image/krishna.avif" />
             <Image onClick={(e) => setAvatar(e.target.src)} loading="lazy" width={150} height={150} className="rounded-full w-[75px] h-[75px] cursor-pointer hover:opacity-50 ease-in animation-all duration-100 bg-white" alt="defaultAvatar" src='/image/defaultAvatar.png' />
              
              </Stack>
        </div>
        
        <button onClick={submitHandler} className="p-3 mx-auto w-[45vw] sm:w-[35vw] md:w-[17vw] rounded bg-slate-600 hover:bg-slate-500 transition-all ease-in">Done</button>
      </div>
    </>
  );
}

export default page;
