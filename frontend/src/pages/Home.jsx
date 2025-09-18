import React, { useEffect, useState } from "react";
import Backgound from "../component/Backgound";
import Hero from "../component/Hero";
import Product from "./Product";
import OurPolicy from "../component/OurPolicy";
import NewLetterBox from "../component/NewLetterBox";
import Footer from "../component/Footer";
import adImage from "../assets/ad2 (2).png";

function Home() {
  let heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection ", text2: "Shop Now!" },
    { text1: "Choose your Perfect Fasion Fit", text2: "Now on Sale!" },
  ];

  let [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount((prevCount) => (prevCount === 3 ? 0 : prevCount + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden relative top-[70px]">
      <div className=" w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh]   bg-gradient-to-l from-[#141414] to-[#0c2025] ">
        <img
          src={adImage}
          alt="Advertisement"
          className="w-full h-auto object-cover rounded-lg mb-4"
        />

        <Backgound heroCount={heroCount} />
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </div>
      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  );
}

export default Home;
