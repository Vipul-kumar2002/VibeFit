import React, { useContext, useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Title from "../component/Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "../component/Card";

// IMPORTANT: Adjust this import path based on where you save the new image
import workwearBanner from "../assets/Shirt1111.jpg";

function Collections() {
  let [showFilter, setShowFilter] = useState(false);
  let { products, search, showSearch } = useContext(shopDataContext);
  let [filterProduct, setFilterProduct] = useState([]);
  let [category, setCaterory] = useState([]);
  let [subCategory, setSubCaterory] = useState([]);
  let [sortType, SetSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCaterory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCaterory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCaterory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCaterory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();

    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category),
      );
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }
    setFilterProduct(productCopy);
  };

  const sortProducts = (e) => {
    let fbCopy = filterProduct.slice();

    switch (sortType) {
      case "low-high":
        setFilterProduct(fbCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProduct(fbCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row pt-[70px] z-[2] pb-[110px]">
      {/* --- FIXED Filter Sidebar --- */}
      <div
        className={`md:fixed md:left-0 md:top-[70px] md:h-[calc(100vh-70px)] md:w-[25vw] lg:w-[20vw] w-full px-6 py-4 border-r border-white/10 text-[#aaf5fa] md:overflow-y-auto shrink-0 transition-all duration-300 ease-in-out z-10 md:bg-[#0c2025]`}
      >
        <div
          className="text-2xl font-semibold flex items-center justify-between cursor-pointer md:cursor-default mb-6 tracking-wide"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          FILTERS
          <span className="md:hidden text-lg text-white/70">
            {showFilter ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        </div>

        <div
          className={`space-y-6 ${showFilter ? "block" : "hidden"} md:block pb-10`}
        >
          {/* Premium Category Box */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-xl shadow-lg">
            <p className="text-sm font-medium text-white/60 mb-4 tracking-widest uppercase">
              Categories
            </p>
            <div className="flex flex-col gap-3">
              {["Men", "Women", "Kids"].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    value={cat}
                    className="w-4 h-4 rounded border-gray-400 bg-transparent accent-[#aaf5fa] cursor-pointer transition-all"
                    onChange={toggleCategory}
                  />
                  <span className="text-gray-300 font-light group-hover:text-white transition-colors">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Premium Sub-Category Box */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-xl shadow-lg">
            <p className="text-sm font-medium text-white/60 mb-4 tracking-widest uppercase">
              Sub-Categories
            </p>
            <div className="flex flex-col gap-3">
              {["TopWear", "BottomWear", "WinterWear"].map((subCat) => (
                <label
                  key={subCat}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    value={subCat}
                    className="w-4 h-4 rounded border-gray-400 bg-transparent accent-[#aaf5fa] cursor-pointer transition-all"
                    onChange={toggleSubCategory}
                  />
                  <span className="text-gray-300 font-light group-hover:text-white transition-colors">
                    {subCat}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content Area (With Margin applied to avoid hiding under the fixed sidebar) --- */}
      <div className="flex-1 md:ml-[25vw] lg:ml-[20vw] px-4 md:px-8 py-6 max-w-[1600px] w-full">
        {/* Workwear Banner */}
        <div className="w-full mb-10">
          <img
            src={workwearBanner}
            alt="Workwear Up To 60% Off"
            className="w-full h-auto max-h-[400px] object-cover rounded-2xl shadow-2xl border border-white/5"
          />
        </div>

        {/* Title and Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          <select
            className="bg-[#1a2f34] text-gray-200 border border-white/20 px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#aaf5fa] transition-colors shadow-sm cursor-pointer w-full sm:w-auto min-w-[200px]"
            onChange={(e) => SetSortType(e.target.value)}
          >
            <option value="relavent">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-10">
          {filterProduct.map((item, index) => (
            <Card
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collections;
