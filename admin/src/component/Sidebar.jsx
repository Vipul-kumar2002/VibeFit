import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Add Items", path: "/add", icon: IoIosAddCircleOutline },
    { name: "List Items", path: "/lists", icon: FaRegListAlt },
    { name: "View Orders", path: "/orders", icon: SiTicktick },
  ];

  return (
    // Removed bg-white to keep your original transparent/inherited background
    <div className="w-[18%] min-w-[80px] min-h-[100vh] border-r-[1px] border-gray-200 py-[60px] fixed left-0 top-0 z-50">
      <div className="flex flex-col gap-3 pt-[40px] pl-[10%] pr-4 text-[15px]">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center justify-center md:justify-start gap-4 px-4 py-3 rounded-l-xl md:rounded-xl cursor-pointer transition-all duration-300 group
                ${
                  isActive
                    ? "bg-[#2c7b89] text-white shadow-md" // Active state holds your custom color
                    : "text-gray-600 hover:bg-[#2c7b89] hover:text-white hover:shadow-sm" // Hover transitions to your custom color
                }
              `}
            >
              <Icon
                className={`w-[22px] h-[22px] transition-transform duration-300 
                  ${isActive ? "scale-110" : "group-hover:scale-110"}
                `}
              />
              <span className="hidden md:block font-medium tracking-wide">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
