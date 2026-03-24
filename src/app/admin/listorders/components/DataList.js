import React from 'react'
import ClientList from './ClientList';

const DataList = async() => {
    const data=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getOrders`);
    let json=await data.json();
    // console.log(json);
  return (
    <ClientList outlet={json}>
      
    </ClientList>
  )
}

export default DataList