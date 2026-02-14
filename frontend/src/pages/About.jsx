import React from "react";
import Title from "../component/Title";
import about from "../assets/About1.jpg";
import NewLetterBox from "../component/NewLetterBox";

function About() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[60px] pt-[100px] pb-[80px]">
      <div>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="w-[100%] max-w-[1200px] flex items-center justify-center flex-col lg:flex-row gap-10 px-4">
        <div className="lg:w-[50%] w-[100%] flex items-center justify-center relative">
          {/* Subtle gold glow behind the image for a premium dark mode effect */}
          <div className="absolute inset-0 bg-[#cba135] rounded-xl blur-2xl opacity-10 transform translate-x-2 translate-y-2"></div>
          <img
            src={about}
            alt="VibeFit Fashion Lifestyle"
            className="lg:w-[80%] w-[90%] rounded-xl shadow-2xl shadow-[#cba135]/20 border-[1px] border-[#cba135]/40 z-10 object-cover"
          />
        </div>

        <div className="lg:w-[50%] w-[100%] flex items-start justify-center gap-[25px] flex-col mt-[30px] lg:mt-[0px]">
          <p className="lg:w-[90%] w-[100%] text-[#e5e5e5] md:text-[17px] text-[15px] leading-relaxed font-light tracking-wide">
            VibeFit was born for the modern trendsetter—created to deliver the
            latest fashion, timeless styles, and everyday wardrobe essentials
            all in one place. Whether you're shopping for menswear, women's
            fashion, or cute outfits for the kids, VibeFit makes upgrading your
            closet simple, exciting, and accessible.
          </p>
          <p className="lg:w-[90%] w-[100%] text-[#e5e5e5] md:text-[17px] text-[15px] leading-relaxed font-light tracking-wide">
            Designed for style-conscious shoppers—combining premium quality,
            comfort, and affordability. From standout party wear to casual
            basics and ethnic collections, we bring top trends to one trusted
            platform. Enjoy fast delivery, easy returns, and a seamless shopping
            experience tailored for the whole family.
          </p>

          <p className="text-[22px] text-[#cba135] lg:text-[26px] mt-[15px] font-serif font-semibold tracking-wide">
            Our Mission
          </p>
          <p className="lg:w-[90%] w-[100%] text-[#e5e5e5] md:text-[17px] text-[15px] leading-relaxed font-light tracking-wide">
            Our mission is to redefine online fashion by delivering inclusive
            styles, great value, and unmatched convenience. VibeFit connects you
            with clothing that empowers you to dress with confidence, express
            your unique vibe, and look your absolute best for every occasion.
          </p>
        </div>
      </div>

      <div className="w-[100%] max-w-[1200px] flex items-center justify-center flex-col gap-[30px] px-4 mt-10">
        <div>
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>

        <div className="w-full flex items-center justify-center lg:flex-row flex-col gap-8 py-[20px]">
          {/* Card 1 */}
          <div className="lg:w-[32%] w-full min-h-[280px] bg-[#ffffff05] backdrop-blur-md border-[1px] border-[#cba135]/30 rounded-2xl shadow-lg shadow-black/50 flex items-center justify-start gap-[20px] flex-col px-[40px] py-[40px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#cba135]/80 hover:shadow-[#cba135]/10">
            <b className="text-[20px] font-serif font-bold text-[#cba135] text-center uppercase tracking-wider">
              Trend & Quality
            </b>
            <p className="text-center text-[#e5e5e5] leading-relaxed font-light">
              We curate the latest styles with a strict focus on premium
              fabrics, flawless stitching, and brands you can trust for your
              everyday wear.
            </p>
          </div>

          {/* Card 2 */}
          <div className="lg:w-[32%] w-full min-h-[280px] bg-[#ffffff05] backdrop-blur-md border-[1px] border-[#cba135]/30 rounded-2xl shadow-lg shadow-black/50 flex items-center justify-start gap-[20px] flex-col px-[40px] py-[40px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#cba135]/80 hover:shadow-[#cba135]/10">
            <b className="text-[20px] font-serif font-bold text-[#cba135] text-center uppercase tracking-wider">
              Seamless Shopping
            </b>
            <p className="text-center text-[#e5e5e5] leading-relaxed font-light">
              Explore thousands of styles effortlessly with our intuitive app
              navigation, secure checkout, and lightning-fast delivery to your
              doorstep.
            </p>
          </div>

          {/* Card 3 */}
          <div className="lg:w-[32%] w-full min-h-[280px] bg-[#ffffff05] backdrop-blur-md border-[1px] border-[#cba135]/30 rounded-2xl shadow-lg shadow-black/50 flex items-center justify-start gap-[20px] flex-col px-[40px] py-[40px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#cba135]/80 hover:shadow-[#cba135]/10">
            <b className="text-[20px] font-serif font-bold text-[#cba135] text-center uppercase tracking-wider">
              Easy Returns
            </b>
            <p className="text-center text-[#e5e5e5] leading-relaxed font-light">
              Shop with absolute peace of mind. We offer hassle-free exchanges,
              easy returns, and a dedicated team ready to help you with sizing
              or styling.
            </p>
          </div>
        </div>
      </div>

      <NewLetterBox />
    </div>
  );
}

export default About;
