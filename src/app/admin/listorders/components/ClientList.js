"use client"
import React, { useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";
import {EditIcon} from "./EditIcon";
import {DeleteIcon} from "./DeleteIcon";
import {EyeIcon} from "./EyeIcon";
import {columns, users} from "./data";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
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
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  let json=outlet["outlet"]["orders"]
    console.log("my Outlet Fetch Data in Client Side is:::::::::::::::::",outlet);
  const renderCell = React.useCallback((user, columnKey) => {
    // console.log("in renderCell my user is:::::::",user);
    const cellValue = user[columnKey];
    // console.log("Column key is::::::",columnKey);

    switch (columnKey) {
      case "userEmail":
        return (
          <User
            avatarProps={{radius: "xl", src: "https://cdn-icons-png.flaticon.com/128/6815/6815043.png"}}
            description={user.address}
            name={cellValue}
          >
            {user.userEmail}
          </User>
        );
      case "amount":
        return (
          <div className="flex flex-col">
      
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.OrderId}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
             
            <Tooltip content="Details">
              <Button onPress={onOpen} onClick={
                ()=>{
                  console.log("Handle Click is Running");
                  fetch(`${process.env.NEXT_PUBLIC_HOST}api/getAllSearchData`,{
                    method:'POST',
                    headers:{
                      'Content-Type':'appication/json'
                    },
                    body:JSON.stringify({"data":user.products})
                  }).then((a)=>a.json()).then((json)=>{
                    console.log("my json is in Returned is::::::::::::",json.data);
                    setMyjson(json.data)
                  })
                }
              } className="bg-transparent   w-fit">

              <span  className="text-lg text-default-400 cursor-pointer active:opacity-50 ">
                <EyeIcon  />
                
              </span>
              </Button>
            </Tooltip>
            <Tooltip content="Edit Order">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Reject Order">
              <button onClick={ ()=>{
                  console.log("Handle Click is Running");
                  fetch(`${process.env.NEXT_PUBLIC_HOST}api/rejectOrder`,{
                    method:'POST',
                    headers:{
                      'Content-Type':'appication/json'
                    },
                    body:JSON.stringify({"query":user.OrderId})
                  }).then((a)=>a.json()).then((json)=>{
                    console.log("my json is in Returned is::::::::::::",json);
                    toast.error("Order Rejected");
                    window.location().relaod();
                    router.refresh();
                    
                  })
                }} >
                  <span  className="text-red-500 text-lg text-default-400 cursor-pointer active:opacity-50 ">

                <DeleteIcon />
                  </span>
              </button>
            </Tooltip>
            
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
   
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">My Orders Items</ModalHeader>
              <ModalBody>
               
                {myjson.map((element)=>{

              return <div className='h-fit flex gap-2 items-center bg-gray-100 rounded-xl my-4'>
              <img className='rounded-lg h-24 w-20' src={element['img']}  /> 
              <h1 className='text-2xl  font-bold'>{element['title']}</h1>
              <h1 className='text-md  font-bold'>{element['price']}</h1>
               </div>
              })}
              </ModalBody>
              <ModalFooter>
                <Button color="success" variant="light" onPress={onClose}>
                  Ok
                </Button>
                
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      
      <TableBody items={json}>
        
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
        </>
  );
}
