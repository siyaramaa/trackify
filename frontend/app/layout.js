import '@/app/globals.css';
import { UserProvider } from '@/context/UserContext';


export const metadata = {
  title: 'Shree Sita Rama',
  description: 'Jay Siya Rama',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en" className='font-mono'>
      <UserProvider>
        <body className='flex h-screen container'>
         {children} 
        

        </body>

   </UserProvider>
    </html>
  )
}



