import React, { useContext } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import upload from "../assets/upload image.jpg";
import { useState } from "react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../component/Loading";

function Add() {
  let [image1, setImage1] = useState(false);
  let [image2, setImage2] = useState(false);
  let [image3, setImage3] = useState(false);
  let [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  let { serverUrl } = useContext(authDataContext);

  const handleAddProduct = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);

      let result = await axios.post(
        serverUrl + "/api/product/addproduct",
        formData,
        { withCredentials: true },
      );

      console.log(result.data);
      toast.success("ADD Product Successfully");
      setLoading(false);

      if (result.data) {
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setBestSeller(false);
        setCategory("Men");
        setSubCategory("TopWear");
        setSizes([]);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Add Product Failed");
    }
  };

  return (
    // Your exact original outer container
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative">
      <Nav />
      <Sidebar />

      <div className="w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0 bottom-[5%]">
        <form
          action=""
          onSubmit={handleAddProduct}
          className="w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[90px] px-[30px] md:px-[60px]"
        >
          <div className="w-[400px] h-[50px] text-[25px] md:text-[40px] text-white font-bold tracking-wide">
            Add Product Page
          </div>

          {/* Upload Images */}
          <div className="w-[80%] h-[130px] flex items-start justify-center flex-col mt-[20px] gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold text-gray-200">
              Upload Images
            </p>
            <div className="w-[100%] h-[100%] flex items-center justify-start gap-4">
              <label
                htmlFor="image1"
                className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer group"
              >
                <img
                  src={!image1 ? upload : URL.createObjectURL(image1)}
                  alt=""
                  className="w-full h-full object-cover rounded-xl shadow-lg border-2 border-gray-600 group-hover:border-[#46d1f7] transition-all duration-300"
                />
                <input
                  type="file"
                  id="image1"
                  hidden
                  onChange={(e) => setImage1(e.target.files[0])}
                  required
                />
              </label>
              <label
                htmlFor="image2"
                className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer group"
              >
                <img
                  src={!image2 ? upload : URL.createObjectURL(image2)}
                  alt=""
                  className="w-full h-full object-cover rounded-xl shadow-lg border-2 border-gray-600 group-hover:border-[#46d1f7] transition-all duration-300"
                />
                <input
                  type="file"
                  id="image2"
                  hidden
                  onChange={(e) => setImage2(e.target.files[0])}
                  required
                />
              </label>
              <label
                htmlFor="image3"
                className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer group"
              >
                <img
                  src={!image3 ? upload : URL.createObjectURL(image3)}
                  alt=""
                  className="w-full h-full object-cover rounded-xl shadow-lg border-2 border-gray-600 group-hover:border-[#46d1f7] transition-all duration-300"
                />
                <input
                  type="file"
                  id="image3"
                  hidden
                  onChange={(e) => setImage3(e.target.files[0])}
                  required
                />
              </label>
              <label
                htmlFor="image4"
                className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer group"
              >
                <img
                  src={!image4 ? upload : URL.createObjectURL(image4)}
                  alt=""
                  className="w-full h-full object-cover rounded-xl shadow-lg border-2 border-gray-600 group-hover:border-[#46d1f7] transition-all duration-300"
                />
                <input
                  type="file"
                  id="image4"
                  hidden
                  onChange={(e) => setImage4(e.target.files[0])}
                  required
                />
              </label>
            </div>
          </div>

          {/* Product Name */}
          <div className="w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold text-gray-200">
              Product Name
            </p>
            <input
              type="text"
              placeholder="Type here"
              className="w-[600px] max-w-[98%] h-[45px] rounded-xl border border-gray-600 bg-white/5 px-[20px] text-[18px] placeholder:text-gray-400 focus:outline-none focus:border-[#46d1f7] focus:ring-1 focus:ring-[#46d1f7] transition-all duration-300"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          {/* Product Description */}
          <div className="w-[80%] flex items-start justify-center flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold text-gray-200">
              Product Description
            </p>
            <textarea
              placeholder="Type here"
              className="w-[600px] max-w-[98%] h-[120px] rounded-xl border border-gray-600 bg-white/5 px-[20px] py-[15px] text-[18px] placeholder:text-gray-400 focus:outline-none focus:border-[#46d1f7] focus:ring-1 focus:ring-[#46d1f7] transition-all duration-300 resize-none"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>

          {/* Category & SubCategory */}
          <div className="w-[80%] flex items-center gap-[10px] flex-wrap">
            <div className="md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px]">
              <p className="text-[20px] md:text-[25px] font-semibold w-[100%] text-gray-200">
                Product Category
              </p>
              <select
                className="w-[60%] h-[45px] px-[15px] rounded-xl border border-gray-600 bg-[#162a30] text-white focus:outline-none focus:border-[#46d1f7] transition-all duration-300 cursor-pointer"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className="md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px]">
              <p className="text-[20px] md:text-[25px] font-semibold w-[100%] text-gray-200">
                Sub-Category
              </p>
              <select
                className="w-[60%] h-[45px] px-[15px] rounded-xl border border-gray-600 bg-[#162a30] text-white focus:outline-none focus:border-[#46d1f7] transition-all duration-300 cursor-pointer"
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
          </div>

          {/* Product Price */}
          <div className="w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold text-gray-200">
              Product Price
            </p>
            <input
              type="number"
              min="0" /* Added this to prevent the spinner from going below 0 */
              placeholder="₹ 2000"
              className="w-[600px] max-w-[98%] h-[45px] rounded-xl border border-gray-600 bg-white/5 px-[20px] text-[18px] placeholder:text-gray-400 focus:outline-none focus:border-[#46d1f7] focus:ring-1 focus:ring-[#46d1f7] transition-all duration-300"
              onChange={(e) => {
                // Check if the value is empty OR greater than/equal to 0 before setting it
                if (e.target.value === "" || Number(e.target.value) >= 0) {
                  setPrice(e.target.value);
                }
              }}
              value={price}
              required
            />
          </div>

          {/* Product Size */}
          <div className="w-[80%] h-[220px] md:h-[100px] flex items-start justify-center flex-col gap-[10px] py-[10px] md:py-[0px]">
            <p className="text-[20px] md:text-[25px] font-semibold text-gray-200">
              Product Size
            </p>
            <div className="flex items-center justify-start gap-[15px] flex-wrap">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div
                  key={size}
                  className={`px-[20px] py-[10px] rounded-xl text-[16px] font-medium border cursor-pointer transition-all duration-300 
                    ${
                      sizes.includes(size)
                        ? "bg-[#2c7b89] text-white border-[#2c7b89] shadow-[0_0_10px_rgba(44,123,137,0.5)]"
                        : "bg-white/5 text-gray-300 border-gray-600 hover:border-[#46d1f7] hover:text-white"
                    }`}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((item) => item !== size)
                        : [...prev, size],
                    )
                  }
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Bestseller Checkbox */}
          <div className="w-[80%] flex items-center justify-start gap-[15px] mt-[20px]">
            <input
              type="checkbox"
              id="checkbox"
              className="w-[22px] h-[22px] cursor-pointer accent-[#2c7b89]"
              onChange={() => setBestSeller((prev) => !prev)}
              checked={bestseller}
            />
            <label
              htmlFor="checkbox"
              className="text-[18px] md:text-[22px] font-medium text-gray-200 cursor-pointer select-none"
            >
              Add to BestSeller
            </label>
          </div>

          {/* Submit Button */}
          <button className="w-[160px] h-[55px] mt-[10px] rounded-xl bg-[#65d8f7] flex items-center justify-center gap-[10px] text-black font-semibold text-[18px] hover:bg-[#46d1f7] hover:shadow-[0_0_15px_rgba(101,216,247,0.4)] transition-all duration-300 active:scale-95">
            {loading ? <Loading /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
