import React from 'react'

const StarsRating = ({outlet}) => {
    const rateArray=outlet
    const labels = ["Excellent", "Best", "Average", "Good", "Poor"];
    console.log("Rate Array is StarRating is:::::::::",outlet);
  return (
    <div className="rate-cont grid grid-cols-5 justify-center items-center gap-4">
      {rateArray.map((rate, index) => (
        <div key={index} className="text-center p-4 border rounded">
          <div className="text-3xl font-thin text-yellow-500">{Math.round(rate*10)}%</div>
          <div className="text-sm text-gray-600">{labels[index]}</div>
        </div>
      ))}
    </div>
  )
}

export default StarsRating