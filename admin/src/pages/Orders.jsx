import React, { useContext, useEffect, useState } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { SiEbox } from "react-icons/si";

function Orders() {
  let [orders, setOrders] = useState([]);
  let { serverUrl } = useContext(authDataContext);

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/list",
        {},
        { withCredentials: true },
      );
      setOrders(result.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/status",
        { orderId, status: e.target.value },
        { withCredentials: true },
      );
      if (result.data) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    // Exact original outer container
    <div className="w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white]">
      <Nav />

      {/* Exact original alignment container */}
      <div className="w-[100%] h-[100%] flex items-center lg:justify-start justify-center">
        <Sidebar />

        {/* Exact original content wrapper */}
        <div className="lg:w-[85%] md:w-[70%] h-[100%] lg:ml-[310px] md:ml-[250px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px]">
          <div className="w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[10px] text-white font-bold tracking-wide">
            All Orders List
          </div>

          <div className="flex flex-col gap-[25px] w-full pb-10">
            {orders?.length > 0 ? (
              orders.map((order, index) => (
                // Upgraded Card: Glassmorphism, smooth border hover, better spacing
                <div
                  key={index}
                  className="group w-[90%] bg-white/5 border border-white/10 hover:border-[#46d1f7]/50 hover:bg-white/10 rounded-2xl flex flex-col lg:flex-row lg:items-center items-start justify-between p-[20px] md:p-[30px] gap-[25px] transition-all duration-300 shadow-sm hover:shadow-[0_4px_20px_rgba(70,209,247,0.1)]"
                >
                  {/* Column 1: Icon */}
                  <div className="w-[60px] h-[60px] shrink-0 bg-[#2c7b89]/20 border border-[#2c7b89]/30 rounded-xl flex items-center justify-center shadow-inner">
                    <SiEbox className="w-[35px] h-[35px] text-[#46d1f7]" />
                  </div>

                  {/* Column 2: Order Items & Address */}
                  <div className="flex-1 flex flex-col gap-[15px]">
                    {/* Items List */}
                    <div className="flex flex-col gap-[4px] text-[16px] text-gray-200 font-medium">
                      {order.items.map((item, idx) => (
                        <p key={idx}>
                          {item.name.toUpperCase()}
                          <span className="text-gray-400 font-normal ml-2">
                            x {item.quantity}{" "}
                            <span className="text-gray-500">({item.size})</span>
                          </span>
                          {idx !== order.items.length - 1 && (
                            <span className="text-gray-600">,</span>
                          )}
                        </p>
                      ))}
                    </div>

                    {/* Address Block */}
                    <div className="text-[14px] text-gray-400 flex flex-col gap-[2px] mt-2">
                      <p className="text-gray-300 font-semibold text-[15px] mb-1">
                        {order.address.firstName + " " + order.address.lastName}
                      </p>
                      <p>{order.address.street}</p>
                      <p>
                        {order.address.city +
                          ", " +
                          order.address.state +
                          ", " +
                          order.address.country +
                          " - " +
                          order.address.pinCode}
                      </p>
                      <p className="mt-1 text-gray-300">
                        {order.address.phone}
                      </p>
                    </div>
                  </div>

                  {/* Column 3: Order Metadata */}
                  <div className="text-[15px] text-gray-300 flex flex-col gap-[6px] lg:w-[200px]">
                    <p className="flex justify-between">
                      <span className="text-gray-500">Items:</span>
                      <span className="font-medium text-white">
                        {order.items.length}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-500">Method:</span>
                      <span className="font-medium text-white">
                        {order.paymentMethod}
                      </span>
                    </p>
                    <p className="flex justify-between items-center mt-1">
                      <span className="text-gray-500">Payment:</span>
                      {/* Dynamic Payment Badge */}
                      <span
                        className={`px-2 py-0.5 rounded-md text-[13px] font-medium tracking-wide ${order.payment ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" : "bg-orange-500/20 text-orange-400 border border-orange-500/20"}`}
                      >
                        {order.payment ? "Done" : "Pending"}
                      </span>
                    </p>
                    <p className="flex justify-between mt-1">
                      <span className="text-gray-500">Date:</span>
                      <span className="text-gray-300">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </p>
                  </div>

                  {/* Column 4: Price & Status Dropdown */}
                  <div className="flex flex-col lg:items-end justify-center gap-[15px] w-full lg:w-[180px] shrink-0 border-t border-white/10 lg:border-none pt-4 lg:pt-0">
                    <p className="text-[24px] font-bold text-[#46d1f7] tracking-wide">
                      ₹ {order.amount}
                    </p>

                    {/* Modern Dropdown */}
                    <select
                      value={order.status}
                      className="w-full lg:w-auto px-[15px] h-[45px] bg-[#162a30] text-gray-100 rounded-xl border border-gray-600 focus:outline-none focus:border-[#46d1f7] focus:ring-1 focus:ring-[#46d1f7] transition-all duration-300 cursor-pointer text-[15px] font-medium shadow-sm"
                      onChange={(e) => statusHandler(e, order._id)}
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              ))
            ) : (
              // Empty State (Matches Lists page aesthetic)
              <div className="w-[90%] h-[250px] border-2 border-dashed border-gray-600 rounded-2xl flex flex-col items-center justify-center gap-4 bg-white/[0.02]">
                <SiEbox className="w-16 h-16 text-gray-600" />
                <div className="text-gray-400 text-lg font-medium tracking-wide">
                  No orders have been placed yet.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
