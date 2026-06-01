"use client"
import React, { useState } from 'react'
import CommentCard from './CommentCard'
import StarsRating from './StarsRating';
import { FaGrinStars } from "react-icons/fa";
import { Textarea, Button } from '@nextui-org/react';
import { Rating } from 'react-simple-star-rating'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';



const CommentsClient = ({outlet}) => {
  
  const router=useRouter()
  const [feedback, setfeedback] = useState("")
  let {revArray,rateArray,prop,reqmail}=outlet
  console.log("In my Comments Client is is is is is:::::::::",reqmail);
  console.log();
  const [rating, setRating] = useState(0)
  const handleRating = (rate) => {
    setRating(rate)
    // console.log(rating);
    
    // other logic
  }
  // Optinal callback functions
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index)
  return (
    <div className='ml-4 w-full'>
        <h1 className='text-2xl'>Ratings and Reviews</h1>
        {
          reqmail=="no" && <div className='grid grid-cols-2 '>
            <div className=' flex  items-center flex-col'>

            <h1 className='text-3xl mt-12'>Login To Review Your Product</h1>
            
            <Link href={'/Login'}>
            <button type='submit'  className=' bg-black text-white px-2 py-2 hover:bg-white hover:text-black rounded-sm my-3 text-xl disabled:bg-slate-700 disabled:cursor-not-allowed disabled:text-white'>Login In</button>
            </Link>
            </div>
            <div className="cards-set  flex flex-col gap-5   border-black ">
    <h1 className='text-3xl'>What Our Customers Say</h1>
    {revArray.map((element)=>{
      return <CommentCard outlet={element}></CommentCard>

    })}
        
        </div>
          </div>
        }
        {reqmail!="no" &&
       <div className=" review-section   border-black grid grid-cols-2 gap-1">
       <div className=' border-black w-[40vw] flex flex-col mt- justify-start items-start gap-4'>
      
            Add a Review To Our Product
           <div className="addreview   border-black w-full p-9 flex flex-col justify-center items-center gap-6">
          <StarsRating outlet={rateArray}></StarsRating>
            <div>

          
                </div>
           <Textarea
          key="underlined"
          variant="bordered"
          
          labelPlacement="outside"
          name='feedback'
          value={feedback}
          onChange={(e)=>{
            setfeedback(e.target.value);
          }}
          placeholder="Add a Review to Our Product"
          className=" border-black rounded-xl hover:outline-none"
          />
         <Rating style={{display:"flex"}}
           className='empty-icons filled-icons'
           onClick={handleRating}
           onPointerEnter={onPointerEnter}
           onPointerLeave={onPointerLeave}
           onPointerMove={onPointerMove}
           /* Available Props */
        />
        <div className="flex gap-4 items-center">
      <Button onClick={()=>{
        console.log("Handle Click is Running");
        // console.log("Rating is",rating);
        fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addComment`,{
          method: 'POST',
          headers: {  
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "_id":prop._id,
            "email":reqmail
            ,"rating":rating
            ,"feedback":feedback,"type":prop.size.split("_")[0]})
          }).then((a)=>a.json()).then((json)=>{
            // console.log(json);
            if (json.success==true) {
              toast.success("Review Added")
              setfeedback("");
              router.refresh();

            }
            else{
              toast.error("Unable To Review")
            }
            console.log("Success");
          })
      
      }} color="warning" className='text-lg p-6 text-white' endContent={<FaGrinStars />
}>
       REVIEW
      </Button>    
      
    </div>
           </div>
            </div>
        <div className="cards-set  flex flex-col gap-5   border-black ">
    <h1 className='text-3xl'>What Our Customers Say</h1>
    {revArray.map((element)=>{
      return <CommentCard outlet={element}></CommentCard>

    })}
        
        </div>
        </div>
}
    </div>
  )
}

export default CommentsClient