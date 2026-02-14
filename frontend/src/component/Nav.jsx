import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart, MdContacts } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/UserContext";
import { authDataContext } from "../context/authContext";
import { shopDataContext } from "../context/ShopContext";

function Nav() {
  let { userData } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext);
  let { showSearch, setShowSearch, search, setSearch, getCartCount } =
    useContext(shopDataContext);

  let [showProfile, setShowProfile] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* --- TOP NAVBAR --- */}
      <nav className="w-full h-[75px] bg-white/80 backdrop-blur-xl z-50 fixed top-0 flex items-center justify-between px-6 lg:px-12 border-b border-gray-200 shadow-sm transition-all duration-300">
        {/* Left: Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="VibeFit"
            className="w-[35px] group-hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-[24px] font-black tracking-tight text-gray-900">
            Vibe<span className="text-[#2c7b89]">Fit</span>
          </h1>
        </div>

        {/* Center: Beautiful Brand-Colored Pill Navigation */}
        <div className="hidden md:flex items-center justify-center">
          {/* Outer container: Soft frosted glass */}
          <ul className="flex items-center gap-1 bg-gray-100/70 p-1.5 rounded-full border border-gray-200/50 shadow-inner backdrop-blur-sm">
            {navItems.map((item, index) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/" && location.pathname.startsWith(item.path));

              return (
                <li
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`relative cursor-pointer px-6 py-2 rounded-full text-[14px] font-bold tracking-wide transition-all duration-300
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[#2c7b89] to-[#3695a4] text-white shadow-[0_4px_10px_rgba(44,123,137,0.3)] scale-105" // Active: Beautiful Teal Gradient
                        : "text-gray-500 hover:bg-[#2c7b89]/10 hover:text-[#2c7b89]" // Hover: Soft Teal Tint
                    }
                  `}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: Action Icons */}
        <div className="flex items-center justify-end gap-5 lg:gap-6 relative">
          {/* Search Toggle */}
          <button
            onClick={() => {
              setShowSearch((prev) => !prev);
              if (!showSearch) navigate("/collection");
            }}
          >
            {!showSearch ? (
              <IoSearchCircleOutline className="w-[34px] h-[34px] text-gray-600 hover:text-[#2c7b89] transition-colors duration-300" />
            ) : (
              <IoSearchCircleSharp className="w-[34px] h-[34px] text-[#2c7b89] transition-colors" />
            )}
          </button>

          {/* Profile Section */}
          <div className="relative">
            {!userData ? (
              <FaCircleUser
                className="w-[28px] h-[28px] text-gray-600 hover:text-[#2c7b89] cursor-pointer transition-colors duration-300"
                onClick={() => setShowProfile((prev) => !prev)}
              />
            ) : (
              <div
                className="w-[34px] h-[34px] bg-gradient-to-tr from-[#2c7b89] to-[#46d1f7] text-white rounded-full flex items-center justify-center cursor-pointer font-bold shadow-md hover:shadow-lg transition-all"
                onClick={() => setShowProfile((prev) => !prev)}
              >
                {userData?.name.slice(0, 1).toUpperCase()}
              </div>
            )}

            {/* Dropdown Menu */}
            {showProfile && (
              <div className="absolute top-[50px] right-0 w-[180px] bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <ul className="text-[14px] font-semibold text-gray-600">
                  {!userData ? (
                    <li
                      className="px-5 py-2.5 hover:bg-[#2c7b89]/10 hover:text-[#2c7b89] cursor-pointer transition-colors"
                      onClick={() => {
                        navigate("/login");
                        setShowProfile(false);
                      }}
                    >
                      Login
                    </li>
                  ) : (
                    <li
                      className="px-5 py-2.5 hover:bg-red-50 hover:text-red-500 cursor-pointer transition-colors"
                      onClick={() => {
                        handleLogout();
                        setShowProfile(false);
                      }}
                    >
                      Logout
                    </li>
                  )}
                  <div className="h-[1px] w-full bg-gray-100 my-1"></div>
                  <li
                    className="px-5 py-2.5 hover:bg-[#2c7b89]/10 hover:text-[#2c7b89] cursor-pointer transition-colors"
                    onClick={() => {
                      navigate("/order");
                      setShowProfile(false);
                    }}
                  >
                    Orders
                  </li>
                  <li
                    className="px-5 py-2.5 hover:bg-[#2c7b89]/10 hover:text-[#2c7b89] cursor-pointer transition-colors"
                    onClick={() => {
                      navigate("/about");
                      setShowProfile(false);
                    }}
                  >
                    About
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <button
            className="hidden md:flex relative items-center justify-center group"
            onClick={() => navigate("/cart")}
          >
            <MdOutlineShoppingCart className="w-[30px] h-[30px] text-gray-600 group-hover:text-[#2c7b89] transition-colors duration-300" />
            <span className="absolute -top-1.5 -right-2 w-[18px] h-[18px] flex items-center justify-center bg-gradient-to-r from-[#2c7b89] to-[#46d1f7] text-white rounded-full text-[10px] font-bold shadow-md">
              {getCartCount()}
            </span>
          </button>
        </div>
      </nav>

      {/* --- SEARCH OVERLAY --- */}
      {showSearch && (
        <div className="w-full h-[80px] bg-gray-50 absolute top-[75px] left-0 z-40 flex items-center justify-center border-b border-gray-200 shadow-inner">
          <div className="w-full max-w-2xl relative px-4">
            <input
              type="text"
              className="w-full h-[50px] bg-white border border-gray-300 rounded-full px-6 text-gray-800 text-[16px] focus:outline-none focus:border-[#2c7b89] focus:ring-2 focus:ring-[#2c7b89]/20 shadow-sm transition-all"
              placeholder="Search VibeFit..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              autoFocus
            />
          </div>
        </div>
      )}

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      <div className="w-full h-[75px] bg-white fixed bottom-0 left-0 z-50 md:hidden flex items-center justify-around px-2 border-t border-gray-200 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] pb-safe">
        {[
          { icon: IoMdHome, name: "Home", path: "/" },
          { icon: HiOutlineCollection, name: "Shop", path: "/collection" },
          { icon: MdContacts, name: "Contact", path: "/contact" },
        ].map((item, index) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <button
              key={index}
              className="flex flex-col items-center justify-center gap-1 w-[25%] h-full"
              onClick={() => navigate(item.path)}
            >
              {/* Active Mobile Icon gets a subtle background pill */}
              <div
                className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? "bg-[#2c7b89]/10 text-[#2c7b89]" : "text-gray-500"}`}
              >
                <Icon className="w-[24px] h-[24px]" />
              </div>
              <span
                className={`text-[10px] font-bold ${isActive ? "text-[#2c7b89]" : "text-gray-500"}`}
              >
                {item.name}
              </span>
            </button>
          );
        })}

        <button
          className="flex flex-col items-center justify-center gap-1 w-[25%] h-full relative"
          onClick={() => navigate("/cart")}
        >
          <div
            className={`relative p-1.5 rounded-xl transition-all duration-300 ${location.pathname === "/cart" ? "bg-[#2c7b89]/10 text-[#2c7b89]" : "text-gray-500"}`}
          >
            <MdOutlineShoppingCart className="w-[24px] h-[24px]" />
            <span className="absolute -top-1 -right-1 w-[16px] h-[16px] flex items-center justify-center bg-[#2c7b89] text-white font-bold rounded-full text-[9px] border-2 border-white shadow-sm">
              {getCartCount()}
            </span>
          </div>
          <span
            className={`text-[10px] font-bold ${location.pathname === "/cart" ? "text-[#2c7b89]" : "text-gray-500"}`}
          >
            Cart
          </span>
        </button>
      </div>
    </>
  );
}

export default Nav;
