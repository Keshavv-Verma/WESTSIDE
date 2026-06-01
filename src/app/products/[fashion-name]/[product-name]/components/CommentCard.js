import React from "react";
import { CiStar } from "react-icons/ci";

export default function CommentCard({outlet}) {
  let {feedback,rating,useremail}=outlet
  const [isFollowed, setIsFollowed] = React.useState(false);
  let arr=[];
  for (let i = 1; i < rating; i++) {
   arr.push(1);
    
  }
  return (
    <div className="border border-black w-[40vw] rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex gap-5">
        <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar" className="w-12 h-12 rounded-full" />
          <div className="flex flex-col gap-1 justify-start">
            <h4 className="text-sm font-semibold text-gray-700">{useremail.split("@")[0]}</h4>
            <h5 className="text-sm text-gray-500">@{useremail.split("@")[0]}</h5>
            <div className="star-flex flex gap-2">
            {(arr).map((e, idx)=>{
              return <CiStar key={idx}/>
            })}
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 py-0 text-sm text-gray-600 overflow-y-hidden text-black justify-start flex items-start p-4">
        <p>
          {feedback}
        </p>
        <span className="pt-2">
          #{useremail.split("@")[0]}WithWest
          <span className="py-2" role="img">
            💻
          </span>
        </span>
      </div>
    </div>
  );
}
