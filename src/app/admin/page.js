import React from 'react'
import {Button} from "@nextui-org/react";
import {UserIcon} from '../components/UserIcon';
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
        <Button className='mt-9' color="danger" variant="bordered" startContent={<CiShoppingCart className='text-xl' />
}>
  
        Add Products
      </Button>
  </Link>
  <Link href={'/admin/listorders'}>
        <Button className='mt-9' color="success" variant="bordered" startContent={<CiShoppingCart className='text-xl' />
}>
        View Orders
      </Button>
  </Link>
       
       
        </div>

    </div>
  )
}

export default page