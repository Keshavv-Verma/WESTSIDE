import React from 'react'
import { Progress } from "@nextui-org/react";
import {CircularProgress, Card, CardBody, CardFooter, Chip} from "@nextui-org/react";

const StarsRating = ({outlet}) => {
    const rateArray=outlet
    console.log("Rate Array is StarRating is:::::::::",outlet);
  return (
    <div className="rate-cont grid grid-cols-3 justify-center items-center">

    <CircularProgress
    label="Excellent"
    
    classNames={{
        svg: "w-36 h-36 drop-shadow-md",
        indicator: "stroke-yellow-500",
        track: "stroke-white/40",
        value: "text-xl font-thin text-yellow-500",
    }}
    style={{color:"rgb(234,179,8)",textDecoration:'bold'}}
    value={rateArray[0]*10}
    strokeWidth={3}
    showValueLabel={true}
    />
    <CircularProgress
     label="Best"
    classNames={{
        svg: "w-36 h-36 drop-shadow-md",
        indicator: "stroke-yellow-500",
        track: "stroke-white/40",
        value: "text-xl font-bold text-yellow-500",
    }}
    value={rateArray[1]*10}
    strokeWidth={3}
    style={{color:"rgb(234,179,8)",textDecoration:'bold'}}
    showValueLabel={true}
    />
    <CircularProgress
    label="Average"
    classNames={{
        svg: "w-36 h-36 drop-shadow-md",
        indicator: "stroke-yellow-500",
        track: "stroke-white/40",
        value: "text-xl font-bold text-yellow-500",
    }}
    value={rateArray[2]*10}
    strokeWidth={3}
    style={{color:"rgb(234,179,8)",textDecoration:'bold'}}
    showValueLabel={true}
    />
    <CircularProgress
    label="Good"
    classNames={{
        svg: "w-36 h-36 drop-shadow-md",
        indicator: "stroke-yellow-500",
        track: "stroke-white/40",
        value: "text-xl font-bold text-yellow-500",
    }}
    value={rateArray[3]*10}
    strokeWidth={3}
    style={{color:"rgb(234,179,8)",textDecoration:'bold'}}
    showValueLabel={true}
    />
    <CircularProgress
    label="Poor"
    classNames={{
        svg: "w-36 h-36 drop-shadow-md",
        indicator: "stroke-yellow-500",
        track: "stroke-white/40",
        value: "text-xl font-bold text-yellow-500",
    }}
    value={rateArray[4]*10}
    strokeWidth={3}
    style={{color:"rgb(234,179,8)",textDecoration:'bold'}}
    showValueLabel={true}
    />
    </div>
  )
}

export default StarsRating