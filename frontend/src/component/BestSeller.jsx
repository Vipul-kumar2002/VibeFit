import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";

// Top Banner
import bestSellerBanner from "../assets/Cutout1.jpg";
// Bottom Promotional Banner
import flipkartBanner from "../assets/Flipcart.jpg";

function BestSeller() {
  let { products } = useContext(shopDataContext);
  let [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    let filterProduct = products.filter((item) => item.bestseller);
    setBestSeller(filterProduct.slice(0, 4));
  }, [products]);

  return (
    <div className="w-full">
      {/* --- Top Full-Width Banner Section --- */}
      <div className="w-full mb-12">
        <img
          src={bestSellerBanner}
          alt="Dressberry Best Sellers - 50-70% Off"
          className="w-full h-auto object-cover"
        />
      </div>
      {/* ------------------------------------- */}

      {/* --- Title Section --- */}
      <div className="w-[100%] text-center md:mt-[20px]">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100">
          Tried, Tested, Loved – Discover Our All-Time Best Sellers.
        </p>
      </div>

      {/* --- Product Cards Grid --- */}
      <div className="w-[100%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px] pb-10">
        {bestSeller.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            id={item._id}
            price={item.price}
            image={item.image1}
          />
        ))}
      </div>

      {/* --- Bottom Promotional Banner Section --- */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-20">
        <img
          src={flipkartBanner}
          alt="Flipkart SBI Credit Card Offer - 5% Cashback"
          className="w-full h-auto object-cover rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
        />
      </div>
      {/* ----------------------------------------- */}
    </div>
  );
}

export default BestSeller;
