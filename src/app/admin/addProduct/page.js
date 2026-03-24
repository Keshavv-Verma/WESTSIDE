'use client'
import React, { useState } from "react";
import {Input} from "@nextui-org/react";
import {MailIcon} from '../../components/MailIcon';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import toast from "react-hot-toast";


export default function App() {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["men"]));

    const selectedValue = React.useMemo(
      () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
      [selectedKeys]
    );
    const [load, setload] = useState(false)
    const [title, settitle] = useState("")
    const [slug, setslug] = useState("")
    const [category, setcategory] = useState("")
    const [img, setimg] = useState("")
    const [desc, setdesc] = useState("")
    const [price, setprice] = useState(0)
    const [quantity, setquantity] = useState(0)
    const [brand, setbrand] = useState(0)
    const handleChange=(e)=>{
        if (e.target.name==="title") {
            settitle(e.target.value);
        }
        if (e.target.name==="slug") {
            setslug(e.target.value);
        }
        if (e.target.name==="desc") {
            setdesc(e.target.value);
        }
        if (e.target.name==="price") {
            setprice(e.target.value);
        }
        if (e.target.name==="quantity") {
            setquantity(e.target.value);
        }
        if (e.target.name==="img") {
            console.log("Set Img is Running");
            setimg(e.target.value);
        }
        if (e.target.name==="brand") {
            console.log("Set Img is Running");
            setbrand(e.target.value);
        }
        

    }
    const handleClick=()=>{
        console.log("Handle Click is Running");
        console.log("My Categobnbmb nbnnry Value is:::::::",selectedValue);
        setload(true);
        setcategory(selectedValue)
        console.log("My Category Value is:::::::",category);
        let k=""
        if(selectedValue=='men'){
            k="addpro"
        }
        else if(selectedValue=='women'){
            
            k="addproWomen"
        }
        else if(selectedValue=='kids'){
            console.log("kids Condtion Satisifed");
            k="addproKids"
        }
        else if(selectedValue=='brand'){
            
            k="addproBrand"
        }
        else if(selectedValue=='beauty'){
            
            k="addproBeauty"
        }
        fetch(`${process.env.NEXT_PUBLIC_HOST}api/${k}`, {
            method: 'POST',
            headers: {  
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "title":title,
                      "slug":slug,
                     "desc":desc,
                     "img":img,
                      "category":brand,
                      "size":selectedValue+"_S_all",
                      "color":"codes-wear",
                      "price":price,
                      "quantity":quantity
              }),
          }).then((a)=>a.json()).then((json)=>{
            if (json.success==true) {
              toast.success("Product Added Successfully");
              
          }
          else{
              toast.error("Unable To Add Product");
           
            }
            
          })
          setload(false)
        
    }
  return (
    <div className="flex flex-col gap-4 mt-11">
      <div className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-10">
      <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className="capitalize"
          radius="none"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
       <DropdownItem  key="men">Men</DropdownItem>
        <DropdownItem  key="women">Women</DropdownItem>
        <DropdownItem  key="kids">Kids</DropdownItem>
        <DropdownItem  key="beauty" className="text-danger" color="danger">
          Beauty
        </DropdownItem>
        <DropdownItem key="brand"  className="text-danger" color="danger">
          Brand
        </DropdownItem>
        <DropdownItem key="household" className="text-danger" color="black">
          Household 
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <div className="flex gap-7">

        <Input
        onChange={handleChange}
          type="text"
          radius="none"
          label="Title"
          name="title"
          placeholder="Title"
          labelPlacement="outside"
          startContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            />
        <Input
        onChange={handleChange}
          type="text"
          radius="none"
          label="Slug"
          name="slug"
          placeholder="Slug"
          labelPlacement="outside"
          startContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            />
            </div>
            <div className="flex gap-7">

        <Input
        onChange={handleChange}
        name="img"
          type="text"
          radius="none"
          label="Image"
          placeholder="Image"
          labelPlacement="outside"
          startContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            />
        <Input
        onChange={handleChange}
        name="desc"
          type="text"
          radius="none"
          label="Description"
          placeholder="Description"
          labelPlacement="outside"
          startContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            />
            </div>
            <div className="flex flex-row gap-8">

        <Input
        onChange={handleChange}
        name="price"
        radius="none"
          type="number"
          label="Price"
          placeholder="0.00"
          labelPlacement="outside"
          startContent={
              <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">₹</span>
            </div>
          }
          />
        <Input
        onChange={handleChange}
        name="quantity"
        radius="none"
          type="number"
          label="Quantity"
          placeholder="10"
          labelPlacement="outside"
          startContent={
              <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">NO.</span>
            </div>
          }
          />
          </div>
        <Input
        radius="none"
        onChange={handleChange}
        name="brand"
          type="url"
          label="Brand"
          placeholder="Ascot"
          labelPlacement="outside"
          
        />
      </div>
      <Button onClick={handleClick} radius="none"  className="text-white bg-black" isLoading={load}>
      Add Product
    </Button>
      
      </div>
    
  );
}
