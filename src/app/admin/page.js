import React from 'react'
import { CiShoppingCart } from "react-icons/ci";
import Link from 'next/link';

const page = () => {
  return (
    
    <div className='container h-full w-full  ml-5 mr-5'>
        <center>

    <h1 className='text-4xl font-medium mt-8'>Welcome To Admin DashBoard</h1>
        </center>
        <div className="mybuttons w-[96vw] flex justify-evenly flex-col">
<Link href={'/admin/addProduct'}>
        <button className='mt-9 px-6 py-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded flex items-center gap-2'>
          <CiShoppingCart className='text-xl' />
          Add Products
        </button>
  </Link>
  <Link href={'/admin/listorders'}>
        <button className='mt-9 px-6 py-2 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded flex items-center gap-2'>
          <CiShoppingCart className='text-xl' />
          View Orders
        </button>
  </Link>
       
       
        </div>

    </div>
  )
}

export default page