import React from 'react'
import NavbarClient from './NavbarClient'
import { cookies } from 'next/headers'
const NavDataComponent =async () => {
  
  const cookieStore = cookies()
  let myjson={success:false,data:null}
  let token = (cookieStore.get('token'))
 
  let newPromise =  
  new Promise(function (resolve, reject) { 
  setTimeout(function () { 
      resolve("Hello Geeks. Wrapped  setTimeout() in a promise"); 
  }, 300); 
}); 

  if (token!=undefined) {
    token=token['value']
    // CRITICAL FIX: Handle both quoted and unquoted token formats
    let tokenVal = token;
    if (token.includes('"')) {
      const tokenParts = token.split('"')
      tokenVal = tokenParts[1] || token;
    }
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_HOST}api/cookieProd`, {
        method: 'POST',
        headers: {  
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token:tokenVal}),
      }).then((a)=>a.json()).then(async (json)=>{
        let result = await newPromise; 
        if (json.success==true && json.data!=null) {
          myjson=json
        }else{
          myjson=json
        }
      }).catch((err) => {
        console.error('Token verification error:', err);
        myjson = {success:false, data:null}
      })
    } catch (error) {
      console.error('NavDataComponent error:', error);
      myjson = {success:false, data:null}
    }
  }
  
  return (
    <>
    <NavbarClient outlet={myjson} />
    </>
  )
}

export default NavDataComponent
