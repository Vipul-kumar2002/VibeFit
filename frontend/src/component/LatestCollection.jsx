import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";

// IMPORTANT: Adjust this import path based on where you save the image in your project
import bannerImage from "../assets/Colletcion.jpg";

function LatestCollection() {
  let { products } = useContext(shopDataContext);
  let [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products]);

  return (
    <div className="w-full">
      {/* --- Full Width Banner Section --- */}
      <div className="w-full mb-12">
        <img
          src={bannerImage}
          alt="Category Day - Effortless Denim"
          className="w-full h-auto object-cover"
        />
      </div>
      {/* ------------------------------ */}

      <div className="w-[100%] text-center md:mt-[20px]">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100 ">
          Step Into Style – New Collection Dropping This Season!
        </p>
      </div>

      <div className="w-[100%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px] pb-10">
        {latestProducts.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            image={item.image1}
            id={item._id}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;
