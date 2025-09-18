import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

function Card({ name, image, id, price }) {
  let { currency } = useContext(shopDataContext)
  let navigate = useNavigate()
  return (
    <div
      className="
        w-full max-w-sm sm:max-w-[300px] h-[420px] sm:h-[400px]
        flex flex-col items-start justify-start
        cursor-pointer border border-[#19afe1bb]
        rounded-xl shadow-lg
        bg-gradient-to-l from-[#141414] to-[#0c2025]
        p-4 m-4
        hover:scale-105 hover:shadow-2xl transition-all duration-300
        backdrop-blur-lg bg-white/10
        overflow-hidden
      "
      onClick={() => navigate(`/productdetail/${id}`)}
    >
      <div className="w-full h-[68%] flex items-center justify-center rounded-lg overflow-hidden bg-white/10">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-lg transition-all duration-500 hover:brightness-90"
        />
      </div>
      <div className="w-full pt-4 space-y-2">
        <div className="text-[#e3fcfe] text-lg font-semibold truncate">{name}</div>
        <div className="text-[#bae6fd] text-base flex items-center gap-2 font-bold">
          <span className="bg-[#141414] text-[#89f5af] px-2 py-1 rounded-full text-xs">{currency}</span>
          <span>{price}</span>
        </div>
      </div>
    </div>
  )
}

export default Card
