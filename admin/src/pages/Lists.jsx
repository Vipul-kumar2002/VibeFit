import React, { useContext, useEffect, useState } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";

function Lists() {
  let [list, setList] = useState([]);
  let { serverUrl } = useContext(authDataContext);

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list");
      setList(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeList = async (id) => {
    try {
      let result = await axios.post(
        `${serverUrl}/api/product/remove/${id}`,
        {},
        { withCredentials: true },
      );

      if (result.data) {
        fetchList();
      } else {
        console.log("Failed to remove Product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    // Exact original outer container and background
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white]">
      <Nav />

      {/* Exact original alignment container */}
      <div className="w-[100%] h-[100%] flex items-center justify-start">
        <Sidebar />

        {/* Exact original content wrapper - No positioning changes here */}
        <div className="w-[82%] h-[100%] lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-[20px] overflow-x-hidden py-[50px] ml-[100px]">
          <div className="w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[10px] text-white font-bold tracking-wide">
            All Listed Products
          </div>

          <div className="flex flex-col gap-[20px] w-full pb-10">
            {list?.length > 0 ? (
              list.map((item, index) => (
                // Upgraded Card: Glassmorphism, smooth hover, better borders
                <div
                  className="group w-[90%] md:h-[130px] h-[110px] bg-white/5 hover:bg-white/10 border border-gray-700/50 hover:border-[#46d1f7]/50 rounded-2xl flex items-center justify-between p-[12px] md:pr-[30px] transition-all duration-300 shadow-sm hover:shadow-[0_4px_20px_rgba(70,209,247,0.1)]"
                  key={item._id || index}
                >
                  {/* Image & Text Wrapper */}
                  <div className="flex items-center gap-[15px] md:gap-[25px] h-full w-[85%]">
                    {/* Image with proper aspect ratio and rounded corners */}
                    <div className="h-full w-[80px] md:w-[110px] shrink-0 overflow-hidden rounded-xl border border-white/10">
                      <img
                        src={item.image1}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        alt={item.name}
                      />
                    </div>

                    {/* Typography: Clear hierarchy and premium colors */}
                    <div className="flex flex-col justify-center gap-[4px] w-full">
                      <h3 className="md:text-[20px] text-[16px] font-semibold text-gray-100 tracking-wide truncate">
                        {item.name}
                      </h3>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="md:text-[14px] text-[12px] text-gray-400 bg-black/30 px-2.5 py-1 rounded-md tracking-wider">
                          {item.category}
                        </span>
                      </div>

                      <div className="md:text-[18px] text-[16px] font-bold text-[#46d1f7] mt-1">
                        ₹{item.price}
                      </div>
                    </div>
                  </div>

                  {/* Modern Delete Button */}
                  <div className="w-[15%] flex items-center justify-end">
                    <button
                      className="w-[40px] h-[40px] md:w-[45px] md:h-[45px] flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                      onClick={() => removeList(item._id)}
                      title="Remove Product"
                    >
                      {/* SVG Trash Icon instead of plain text 'X' */}
                      <svg
                        xmlns="http://www.w3.org/0000/svg"
                        className="h-5 w-5 md:h-6 md:w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              // Designed Empty State
              <div className="w-[90%] h-[200px] border-2 border-dashed border-gray-600 rounded-2xl flex flex-col items-center justify-center gap-4 bg-white/[0.02]">
                <svg
                  className="w-12 h-12 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <div className="text-gray-400 text-lg font-medium">
                  No products listed yet.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lists;
