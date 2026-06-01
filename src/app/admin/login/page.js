"use client"
import React, { useState } from "react";
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon";
export default function App() {
    const [isVisible, setIsVisible] = React.useState(false);
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const handleChange=(e)=>{
        if(e.target.name=="email"){
            setEmail(e.target.value);
        }
        else if(e.target.name=="password"){
            setpassword(e.target.value)
        }
    }
    const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="w-full flex flex-col flex-wrap gap-7 mt-11 px-4 max-w-md mx-auto">
      <h1 className="font-thin text-2xl">Welcome To admin Dashboard
      </h1>
      <div className="form-group">
        <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="form-group relative">
        <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
        <div className="relative">
          <input
            id="password"
            type={isVisible ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none" 
            type="button" 
            onClick={toggleVisibility}
          >
            {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-gray-400" />
                ) : (
                    <EyeFilledIcon className="text-2xl text-gray-400" />
                    )}
          </button>
        </div>
      </div>
      <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
        Submit
      </button>  
    </div>
  );
}
