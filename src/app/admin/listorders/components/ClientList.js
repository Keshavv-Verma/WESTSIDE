"use client"
import React, { useState } from "react";
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";

const statusColorMap = {
  "Processing":"warning",
  "Cleared": "success",
  "pending": "danger",
};

export default function ClientList(outlet) {
  const router=useRouter()
  const [myjson, setMyjson] = useState([{title:"None"}])
  const [isModalOpen, setIsModalOpen] = useState(false);

  let json=outlet["outlet"]["orders"]
    console.log("my Outlet Fetch Data in Client Side is:::::::::::::::::",outlet);
    
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Orders List</h2>
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-96 overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Order Details</h3>
            {myjson.map((item, idx) => (
              <div key={idx} className="mb-4 pb-4 border-b">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-600">{item.price && `₹${item.price}`}</p>
              </div>
            ))}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Simple Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2 text-left">Email</th>
              <th className="border border-gray-300 p-2 text-left">Amount</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {json && json.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">
                  <div>
                    <p className="font-semibold">{user.userEmail}</p>
                    <p className="text-sm text-gray-600">{user.address}</p>
                  </div>
                </td>
                <td className="border border-gray-300 p-2">
                  <p className="font-semibold">₹{user.amount}</p>
                  <p className="text-sm text-gray-600">{user.OrderId}</p>
                </td>
                <td className="border border-gray-300 p-2">
                  <span className={`px-2 py-1 rounded text-sm font-semibold ${
                    user.status === 'Cleared' ? 'bg-green-100 text-green-800' :
                    user.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="border border-gray-300 p-2">
                  <button 
                    onClick={() => {
                      fetch(`${process.env.NEXT_PUBLIC_HOST}api/getAllSearchData`,{
                        method:'POST',
                        headers:{
                          'Content-Type':'application/json'
                        },
                        body:JSON.stringify({"data":user.products})
                      }).then((a)=>a.json()).then((json)=>{
                        setMyjson(json.data);
                        setIsModalOpen(true);
                      })
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
