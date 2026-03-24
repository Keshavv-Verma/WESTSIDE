import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import { CiStar } from "react-icons/ci";

export default function CommentCard({outlet}) {
  let {feedback,rating,useremail}=outlet
  const [isFollowed, setIsFollowed] = React.useState(false);
  let arr=[];
  for (let i = 1; i < rating; i++) {
   arr.push(1);
    
  }
  return (
    <Card className=" border-black w-[40vw]">
      <CardHeader className="">
        <div className="flex gap-5  ">
        <Avatar isBordered color="default" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <div className="flex flex-col gap-1 justify-start">
            <h4 className="text-small font-semibold leading-none text-default-600">{useremail.split("@")[0]}</h4>

            <h5 className="text-small tracking-tight text-default-400">@{useremail.split("@")[0]}</h5>
            <div className="star-flex flex  gap-2">

            {(arr).map((e)=>{
              return <CiStar/>
            })}
            </div>
          </div>
        </div>
       
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400   overflow-y-hidden  text-black justify-start flex items-start ">
        <p>
          {feedback}
        </p>
        <span className="pt-2">
          #{useremail.split("@")[0]}WithWest
          <span className="py-2" aria-label="computer" role="img">
            💻
          </span>
        </span>
      </CardBody>
      
    </Card>
  );
}
