import React from "react";
import Title from "../component/Title";
import contact from "../assets/Contact1.jpg";
import NewLetterBox from "../component/NewLetterBox";

function Contact() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[120px] pb-[80px]">
      <Title text1={"CONTACT"} text2={"US"} />

      <div className="w-[100%] max-w-[1000px] flex items-center justify-center flex-col lg:flex-row gap-12 px-4">
        {/* Left Side - Image (Simplified, no z-index) */}
        <div className="lg:w-[50%] w-[100%] flex items-center justify-center">
          <img
            src={contact}
            alt="VibeFit Office"
            className="w-[100%] rounded-lg shadow-lg shadow-black/60 border border-[#cba135]/30 object-cover"
          />
        </div>

        {/* Right Side - Contact Details (Simplified layout, clean text) */}
        <div className="lg:w-[50%] w-[100%] flex flex-col justify-center gap-[30px]">
          {/* Store Address */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[22px] text-[#cba135] font-serif font-semibold tracking-wide">
              Our Store
            </h3>
            <div className="text-[#e5e5e5] text-[15px] font-light leading-relaxed">
              <p>VibeFit HQ</p>
              <p>Ranchi, Jharkhand, India</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[22px] text-[#cba135] font-serif font-semibold tracking-wide">
              Get In Touch
            </h3>
            <div className="text-[#e5e5e5] text-[15px] font-light leading-relaxed flex flex-col gap-1">
              <p>
                <span className="font-semibold text-[#cba135] mr-2">Tel:</span>
                +91-8340275873
              </p>
              <p>
                <span className="font-semibold text-[#cba135] mr-2">
                  Email:
                </span>
                vipulkumar3885@gmail.com
              </p>
            </div>
          </div>

          {/* Careers & Button */}
          <div className="flex flex-col gap-5 mt-2 pt-6 border-t border-gray-800">
            <div>
              <h3 className="text-[22px] text-[#cba135] font-serif font-semibold tracking-wide">
                Careers at VibeFit
              </h3>
              <p className="text-[#e5e5e5] text-[15px] mt-2 font-light">
                Ready to define the future of fashion? Learn more about our
                teams and job openings.
              </p>
            </div>

            <button className="px-[30px] py-[12px] w-fit text-[#cba135] text-[15px] font-semibold bg-transparent border border-[#cba135] rounded hover:bg-[#cba135] hover:text-[#141414] transition-colors duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      <NewLetterBox />
    </div>
  );
}

export default Contact;
