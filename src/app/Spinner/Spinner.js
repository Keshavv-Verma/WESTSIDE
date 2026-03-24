import React from 'react'
import { ClimbingBoxLoader,MoonLoader,ClipLoader } from 'react-spinners'
import {CircularProgress} from "@nextui-org/react";

const Spinner = () => {
  return (
        <div >
       
       <CircularProgress color="default" aria-label="Loading..."/>
    </div>
  )
}

export default Spinner