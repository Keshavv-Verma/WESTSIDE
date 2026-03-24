"use client"
import React, { useState } from "react";
import {Button, ButtonGroup, Input} from "@nextui-org/react";
// import {Input} from "@nextui-org/react";
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
  const radius = [
    "full",
    "lg",
    "md",
    "sm",
    "none",
  ];

  return (
    <div className="w-full flex flex-col flex-wrap gap-7 mt-11">
      <h1 className="font-thin text-2xl">Welcome To admin Dashboard
      </h1>
      <Input
      isClearable
      type="email"
      label="Email"
      variant="bordered"
      placeholder="Enter your email"
      defaultValue=""
      onClear={() => console.log("input cleared")}
      className="max-w-xs"
      onChange={handleChange}
      name="email"
    />
         <Input
      label="Password"
      variant="bordered"
      onChange={handleChange}
      name="password"
      placeholder="Enter your password"
      color="black"
      endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="max-w-xs"
    />
        <Button radius="none" className="bg-black text-white">
        Submit
      </Button>  
    </div>
  );
}
