import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";

function Nav() {
  let navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let { getAdmin } = useContext(adminDataContext);

  const logOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);
      toast.success("Logged out successfully");
      getAdmin();
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="w-full h-[75px] bg-[#0c2025]/80 backdrop-blur-md z-50 fixed top-0 flex items-center justify-between px-4 md:px-10 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.2)] transition-all duration-300 relative">
      {/* --- LEFT: Brand Logo & Name --- */}
      <div
        className="flex items-center gap-2 md:gap-4 cursor-pointer group z-10"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="VibeFit Logo"
          className="w-[30px] md:w-[35px] shrink-0 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(70,209,247,0.3)]"
        />
        <h1 className="text-[20px] md:text-[24px] font-black tracking-tight text-white shrink-0">
          Vibe<span className="text-[#46d1f7]">Fit</span>
        </h1>
      </div>

      {/* --- CENTER: Premium Admin Indicator (LARGER) --- */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 md:gap-4 px-6 py-2.5 rounded-full bg-gradient-to-b from-white/10 to-transparent border border-[#46d1f7]/30 shadow-[0_0_20px_rgba(70,209,247,0.15)] backdrop-blur-xl z-0 overflow-hidden cursor-default group">
        {/* Subtle highlight line right at the top of the pill */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1.5px] bg-gradient-to-r from-transparent via-[#46d1f7] to-transparent opacity-80"></div>

        {/* Pulsing "Live" Status Dot - Enlarged slightly to match bigger text */}
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#46d1f7] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#46d1f7] shadow-[0_0_10px_#46d1f7]"></span>
        </div>

        {/* Premium Gradient Text - INCREASED SIZE */}
        <span className="text-[16px] lg:text-[18px] font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#46d1f7] to-white whitespace-nowrap">
          Admin Panel
        </span>
      </div>

      {/* --- RIGHT: Logout Button --- */}
      <button
        className="flex items-center justify-center gap-2.5 px-4 md:px-5 py-2 md:py-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all duration-300 group font-medium shadow-sm active:scale-95 shrink-0 z-10"
        onClick={logOut}
      >
        <span className="hidden sm:block tracking-wide whitespace-nowrap text-[15px]">
          Log Out
        </span>
        <FiLogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  );
}

export default Nav;
