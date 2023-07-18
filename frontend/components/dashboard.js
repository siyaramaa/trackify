"use client";
import React, {useEffect, useState} from "react";



import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useUserContext } from "@/context/UserContext";
import {useGlobalContext} from "@/context/GlobalContext"
import dynamic from "next/dynamic";
import MenuOpenIcon from '@mui/icons-material/MenuOpen'

const Link = dynamic(() => import('next/link'));

const MenuIcon = dynamic(() => import('@mui/icons-material/Menu'));

const Image = dynamic(() => import('next/image'), {
  ssr: false,
  loading: () => <div className="rounded-full w-[57px] h-[57px] md:w-[65px] md:h-[65px] xl:w-[85px] xl:h-[85px] cursor-pointer hover:opacity-50 ease-in mx-auto animation-all duration-100 animate-pulse bg-slate-400" />
});
//Importing specifically without destructuring frees some space in dev mode for compiler or server.
const DashboardIcon = dynamic(() => import("@mui/icons-material/Dashboard"),{
        ssr: false,
});
const PaidIcon = dynamic(() => import("@mui/icons-material/Paid"), {
  ssr: false,
});
const MoneyOffIcon = dynamic(() => import("@mui/icons-material/MoneyOff"),{
  ssr: false,
});
const BarChartIcon = dynamic(() => import("@mui/icons-material/BarChart"),{
  ssr: false,
});
const PowerSettingsNewIcon = dynamic(() => import('@mui/icons-material/PowerSettingsNew'),{
  ssr: false,
})
const Settings = dynamic(() => import('@mui/icons-material/Settings'),{
  ssr: false,
})






function Dashboard() {
  
    const UserContext = useUserContext();
    const GlobalContext = useGlobalContext();
    const {currentUserDetail} = UserContext;
    const {getIncomes,getExpenses, incomes, expenses} = GlobalContext;
    let totalInc = 0;
    let totalExp = 0;
    const [currentUser, setCurrentUser] = useState();
    const [scrollY, SetScrollY] = useState(0);
    const [showNav, SetShowNav] = useState(false);

    useEffect(() => {
      getIncomes();
      getExpenses();
      const fetchReq = async () => {
        const resp = await currentUserDetail();
        setCurrentUser(resp[0]);
        
      }
      fetchReq();      
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
            window.addEventListener('scroll', () => {
                      SetScrollY(window.scrollY);
            })
          return () => window.removeEventListener('scroll', window);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    incomes?.forEach((i) => totalInc += i.amount );
    expenses?.forEach((i) => totalExp += i.amount );   

  
  const router = useRouter();
  const logoutHandler = () => {

      Cookies.remove('userSession');
      router.push('/auth/signin');
      router.refresh();
  }
  
  
  return (

        <div className='w-0 md:w-52 h-screen'>
          <div onClick={() => SetShowNav(!showNav)} className={`MenuIcon fixed top-2 right-3 z-50 p-1 ${showNav && 'bg-teal-200'} ${scrollY > 10 && 'bg-teal-200'} transition-all ease-in delay-75 rounded-lg hover:bg-teal-200 md:hidden`}>
            {
              showNav ? <MenuOpenIcon />
                  : <MenuIcon />
              }
          </div>
    <div className={`${!showNav && 'opacity-0 pointer-events-none'} md:pointer-events-auto md:opacity-100 md:flex flex-col p-4 w-[55vw] md:w-32 items-center  xl:w-44 h-screen rounded-r-2xl bg-teal-200 z-40 space-y-20 xl:space-y-2 transition-all ease-in delay-[50ms] fixed top-0 left-0`}>


            
      <div className="userInformation space-y-4 mx-auto xl:p-4 xl:bg-white rounded-xl h-14 w-16 xl:h-48 xl:w-40 xl:mx-0">

              {
                    currentUser?.profilePicture != '' ?
                <Image width={150} height={150} className={`nextImg w-[57px] h-[57px] md:w-[65px] md:h-[65px] xl:w-[85px] xl:h-[85px] mx-auto rounded-full object-cover bg-white`} alt="userIntial" src={currentUser?.profilePicture.includes('data:image/') ? currentUser?.profilePicture : `/image/${currentUser?.profilePicture}` } />
                : <Image width={150} height={150} className={`nextImg w-[57px] h-[57px] md:w-[65px] md:h-[65px] xl:w-[85px] xl:h-[85px] mx-auto rounded-full object-cover bg-white`} alt="userIntial" src={`/image/defaultAvatar.png`} />

              }
        
    
            
        <div className="details text-center hidden xl:block">
          <h1 className="font-semibold text-xl">{currentUser?.username}</h1>
          <p className="text-gray-500 text-sm">
            Balance: <i className={`text-${totalInc-totalExp < 0 ? 'red-500' : 'green-500'}`}>{totalInc-totalExp}</i>
          </p>
        </div>
      </div>
      <div className="navLinks text-xs md:text-base flex flex-col items-center space-y-4 p-4 flex-1">
        <Link
          href={"/inventory"}
          onClick={() => SetShowNav(false)}
          className="w-full p-3 flex justify-center h-12 items-center rounded delay-75 transition-all ease-out hover:bg-orange-200"
        >
          <DashboardIcon className="mr-2" />
          <p className={`md:hidden xl:block`}>Dashboard</p>
        </Link>
        <Link
          href={"/inventory/income"}
          onClick={() => SetShowNav(false)}
          className="w-full flex p-3 justify-center h-12 items-center rounded delay-75 transition-all ease-out  hover:bg-orange-200"
        >
          <PaidIcon className="mr-2" />
          <p className={`md:hidden xl:block`}>Incomes</p>
        </Link>
        <Link
          href={"/inventory/expense"}
          onClick={() => SetShowNav(false)}
          className="w-full flex p-3 justify-center h-12 items-center rounded delay-75 transition-all ease-out  hover:bg-orange-200"
        >
          <MoneyOffIcon className="mr-2" />
          <p className={`md:hidden xl:block`}>Expenses</p>
        </Link>
        <Link
          href={"/inventory/analytics"}
          onClick={() => SetShowNav(false)}
          className="w-full flex p-3 justify-center h-12 items-center rounded delay-75 transition-all ease-out  hover:bg-orange-200"
        >
          <BarChartIcon className="mr-2" />
          <p className={`md:hidden xl:block`}>Analytics</p>
        </Link>

        
      </div>

      <div className="BottomnavLinks text-xs md:text-base flex flex-col items-center space-y-4 p-4">

      <Link
          href={"/inventory/settings"}
          onClick={() => SetShowNav(false)}
          className="w-full flex p-3 justify-center h-12 items-center rounded delay-75 transition-all ease-out  hover:bg-orange-200"
        >
          <Settings className="mr-2" />
          <p className="md:hidden xl:block">Settings</p>
        </Link>

      <button
          onClick={logoutHandler}
          className="w-full flex p-3 justify-center h-12 items-center rounded delay-75 transition-all ease-out  hover:bg-orange-200"
        >
          <PowerSettingsNewIcon className="mr-2" />
          <p className="md:hidden xl:block">Logout</p>
        </button>
        </div>

    </div>


     </div>

  );
}

export default Dashboard;




// <div className="flex flex-col p-4 w-[13vw] md:w-28 items-center  xl:w-44 h-screen rounded-r-lg bg-teal-200  z-20 space-y-20 xl:space-y-2 transition-all ease-in-out delay-75 fixed top-0 left-0">
            
//             <div className="userInformation space-y-4 xl:p-4 xl:bg-white rounded-xl h-14 w-16 xl:h-48 xl:w-40">
      
//                     {
//                           currentUser?.profilePicture &&
//                       <Image width={150} height={150} className={`nextImg w-[57px] h-[57px] md:w-[65px] md:h-[65px] xl:w-[85px] xl:h-[85px] mx-auto rounded-full object-cover bg-white`} alt="userIntial" src={currentUser?.profilePicture.includes('data:image/') ? currentUser?.profilePicture : `/image/${currentUser?.profilePicture}` } />
//                     }
              
          
                  
//               <div className="details text-center hidden xl:block">
//                 <h1 className="font-semibold text-xl">{currentUser?.username}</h1>
//                 <p className="text-gray-500 text-sm">
//                   Balance: <i className={`text-${totalInc-totalExp < 0 ? 'red-500' : 'green-500'}`}>{totalInc-totalExp}</i>
//                 </p>
//               </div>
//             </div>
//             <div className="navLinks flex flex-col items-center space-y-4 p-4 flex-1">
//               <Link
//                 href={"/inventory"}
//                 className="w-full p-3 flex justify-center h-12 items-center rounded delay-75 transition-all ease-out hover:bg-orange-200"
//               >
//                 <DashboardIcon className="mr-2" />
//                 <p className="hidden xl:block">Dashboard</p>
//               </Link>
//               <Link
//                 href={"/inventory/income"}
//                 className="w-full flex p-3 justify-center h-12 items-center rounded delay-75 transition-all ease-out  hover:bg-orange-200"
//               >
//                 <PaidIcon className="mr-2" />
//                 <p className="hidden xl:block">Incomes</p>
//               </Link>
//               <Link
//                 href={"/inventory/expense"}
//                 className="w-full flex p-3 justify-center h-12 items-center rounded delay-75 transition-all ease-out  hover:bg-orange-200"
//               >
//                 <MoneyOffIcon className="mr-2" />
//                 <p className="hidden xl:block">Expenses</p>
//               </Link>
//               <Link
//                 href={"/inventory/analytics"}
//                 className="w-full flex p-3 justify-center h-12 items-center rounded delay-75 transition-all ease-out  hover:bg-orange-200"
//               >
//                 <BarChartIcon className="mr-2" />
//                 <p className="hidden xl:block">Analytics</p>
//               </Link>
      
              
//             </div>
      
//             <div className="BottomnavLinks flex flex-col items-center space-y-4 p-4">
      
//             <Link
//                 href={"/inventory/settings"}
//                 className="w-full flex p-3 justify-center h-12 items-center rounded delay-75 transition-all ease-out  hover:bg-orange-200"
//               >
//                 <Settings className="mr-2" />
//                 <p className="hidden xl:block">Settings</p>
//               </Link>
      
//             <button
//                 onClick={logoutHandler}
//                 className="w-full flex p-3 justify-center h-12 items-center rounded delay-75 transition-all ease-out  hover:bg-orange-200"
//               >
//                 <PowerSettingsNewIcon className="mr-2" />
//                 <p className="hidden xl:block">Logout</p>
//               </button>
//               </div>
      
//           </div>