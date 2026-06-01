'use client'
import React, { useState } from "react";
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
            setimg(e.target.value);
        }
        if (e.target.name==="brand") {
            setbrand(e.target.value);
        }
        

    }
    const handleClick=()=>{
        setload(true);
        setcategory(selectedValue)
        let k=""
        if(selectedValue=='men'){
            k="addpro"
        }
        else if(selectedValue=='women'){
            
            k="addproWomen"
        }
        else if(selectedValue=='kids'){
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
    <div className="flex flex-col gap-4 mt-11 max-w-4xl mx-auto px-4">
      <div className="flex flex-col w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-10">
      
      {/* Category Dropdown */}
      <select 
        value={Array.from(selectedKeys)[0] || "men"}
        onChange={(e) => setSelectedKeys(new Set([e.target.value]))}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="kids">Kids</option>
        <option value="beauty">Beauty</option>
        <option value="brand">Brand</option>
        <option value="household">Household</option>
      </select>

      {/* Title and Slug */}
      <div className="flex gap-7 flex-col md:flex-row">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="Title"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Slug</label>
          <input
            onChange={handleChange}
            type="text"
            name="slug"
            placeholder="Slug"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Image and Description */}
      <div className="flex gap-7 flex-col md:flex-row">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input
            onChange={handleChange}
            type="text"
            name="img"
            placeholder="Image URL"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Description</label>
          <input
            onChange={handleChange}
            type="text"
            name="desc"
            placeholder="Description"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Price and Quantity */}
      <div className="flex gap-7 flex-col md:flex-row">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Price (₹)</label>
          <input
            onChange={handleChange}
            type="number"
            name="price"
            placeholder="0.00"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Quantity</label>
          <input
            onChange={handleChange}
            type="number"
            name="quantity"
            placeholder="10"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Brand */}
      <div>
        <label className="block text-sm font-medium mb-2">Brand</label>
        <input
          onChange={handleChange}
          type="text"
          name="brand"
          placeholder="Ascot"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button 
        onClick={handleClick} 
        disabled={load}
        className="w-full px-6 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-500 transition"
      >
        {load ? "Adding..." : "Add Product"}
      </button>
      </div>
    </div>
  );
}
