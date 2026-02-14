import React, { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

function Card({ name, image, id, price }) {
  let { currency } = useContext(shopDataContext);
  let navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/productdetail/${id}`)}
      className="w-[300px] max-w-[90%] h-[420px] bg-[#ffffff0a] backdrop-blur-lg rounded-lg hover:scale-[102%] flex flex-col items-start justify-start p-3 cursor-pointer border-[1px] border-[#80808049] transition-transform duration-300"
    >
      {/* 1. Adjusted Image Height: Changed from 80% to a fixed height or smaller percentage to leave room for text */}
      <div className="w-full h-[260px] mb-3 overflow-hidden rounded-md">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* 2. Text Container: Uses flex-col and justify-between to push price to bottom */}
      <div className="flex flex-col justify-between flex-grow w-full">
        {/* Name: Added line-clamp-2 to cut off text if it's too long (requires Tailwind line-clamp plugin or v3.3+) */}
        <div className="text-[#c3f6fa] text-[18px] font-medium leading-tight line-clamp-2 mb-2">
          {name}
        </div>

        {/* Price */}
        <div className="text-[#f3fafa] text-[16px] font-semibold">
          {currency} {price}
        </div>
      </div>
    </div>
  );
}

export default Card;
