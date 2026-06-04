'use server'
import React from 'react'
import CartClient from './CartClient'

const NetworkFetch =async (props) => {
    const cookies=props?.cookies || []
    const validCookies = cookies.filter(cookie => cookie && cookie.name && cookie.value);

    const fetchData=async ()=>{
        let data=await fetch(`${process.env.NEXT_PUBLIC_HOST}api/getProd`, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ id: validCookies }), // Send as JSON
         })
         let json=await data.json()
         return json;
        }
         
       // Empty dependency array means this effect runs only once after the initial render
     
     let myjson=await fetchData()
  return (
    <>
        <CartClient outlet={myjson}></CartClient>
    </>
  )
}

export default NetworkFetch