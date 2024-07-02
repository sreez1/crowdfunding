import React from 'react';

import { tagType, user } from '../assets';
import { daysLeft } from '../utils';

const FundCard = ({ owner,name, title, description, target, deadline, amountCollected, image, handleClick }) => {
  const remainingDays = daysLeft(deadline);
  
  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#B3E5FC] cursor-pointer shadow-secondary hover:scale-102 transition-transform duration-300" onClick={handleClick}>
      <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]"/>

      <div className="flex flex-col p-4">
        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-black text-left leading-[26px] truncate">{name}</h3>
        </div>
        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-black text-left leading-[26px] truncate">{title}</h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#607D8B] text-left leading-[18px] truncate">{description}</p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#607D8B] leading-[22px]">{amountCollected} ETH</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#607D8B] sm:max-w-[120px] truncate">Raised of {target} ETH</p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#607D8B] leading-[22px]">{remainingDays}</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#607D8B] sm:max-w-[120px] truncate">Days Left</p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#2E1A47]">
            <img src={user} alt="user" className="w-1/2 h-1/2 object-contain"/>
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#607D8B] truncate">by <span className="text-[#607D8B]">{owner}</span></p>
        </div>
      </div>
    </div>
  )
}

export default FundCard