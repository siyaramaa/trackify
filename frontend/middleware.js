import { NextResponse } from 'next/server'
 
export function middleware(req) {

  const baseURL = process.env.baseURL;
    //Default Page
    if(req.nextUrl.pathname == '/'){
      return NextResponse.redirect(`${baseURL}/inventory`);
    }

    
 
      // User is  logged in
      if(req.cookies.get('userSession') != undefined){
        if (req.nextUrl.pathname.startsWith('/auth')) {
          return NextResponse.redirect(`${baseURL}/inventory`);
        }
      }

      if(req.cookies.get('userSession') == undefined){
        if (req.nextUrl.pathname.startsWith('/inventory')) {
          return NextResponse.redirect(`${baseURL}/auth/signin`);
        }
      }
      


}
 
