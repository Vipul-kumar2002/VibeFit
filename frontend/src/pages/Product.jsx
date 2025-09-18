import React from "react";
import LatestCollection from "../component/LatestCollection";
import BestSeller from "../component/BestSeller";
import categoryDayImg from "../assets/Colletcion.jpg";
import focusTodayGif from "../assets/gif.webp";

function Product() {
  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col py-[20px]">
      <img
        src={categoryDayImg}
        alt="Category Day - Effortless Denim, Perfect Fit"
        className="w-full max-w-[1200px] object-cover mb-6 rounded-lg shadow"
      />

      <div className="w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col ">
        <LatestCollection />
      </div>

      <img
        src={focusTodayGif}
        alt="In Focus Today"
        className="w-full max-w-[1200px] object-cover mb-6 rounded-lg shadow"
      />

      <div className="w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col ">
        <BestSeller />
      </div>
    </div>
  );
}

export default Product;
