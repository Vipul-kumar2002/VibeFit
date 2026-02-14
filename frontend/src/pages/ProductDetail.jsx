import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import { FaStar, FaStarHalfAlt, FaTruck, FaExchangeAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import RelatedProduct from "../component/RelatedProduct";
import Loading from "../component/Loading";

function ProductDetail() {
  const { productId } = useParams();
  const { products, currency, addtoCart, loading } =
    useContext(shopDataContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    const result = products.find((item) => item._id === productId);
    if (result) {
      setProductData(result);
      setImage(result.image1);
    }
  };

  useEffect(() => {
    fetchProductData();
    setSize("");
    window.scrollTo(0, 0);
  }, [productId, products]);

  if (!productData) return <div className="h-screen w-full bg-[#141414]"></div>;

  const imageList = [
    productData.image1,
    productData.image2,
    productData.image3,
    productData.image4,
  ].filter(Boolean);

  return (
    // 1. Changed min-h-screen to h-auto to prevent layout locking
    <div className="w-full h-auto bg-[#141414] text-[#f3fafa] transition-opacity duration-500 ease-in overflow-hidden">
      {/* --- Main Product Section --- */}
      {/* 2. Added pb-16 to create safe space at bottom of this section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16">
        {/* Grid Layout: Items align to start to avoid stretching weirdly */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT: Image Gallery */}
          <div className="flex flex-col-reverse lg:flex-row gap-4 w-full">
            <div className="flex lg:flex-col flex-row gap-3 overflow-x-auto lg:overflow-y-auto lg:h-[500px] justify-between lg:justify-start hide-scrollbar">
              {imageList.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  onClick={() => setImage(img)}
                  className={`w-[20%] lg:w-[100px] aspect-square object-cover rounded-md cursor-pointer border-2 transition-all duration-200 
                    ${image === img ? "border-blue-400 opacity-100" : "border-transparent opacity-60 hover:opacity-100"}`}
                />
              ))}
            </div>

            <div className="w-full lg:h-[500px] h-auto aspect-[4/5] bg-[#ffffff0a] rounded-xl overflow-hidden border border-[#ffffff1a] relative group">
              <img
                src={image}
                alt="Main Product"
                className="w-full h-full object-contain mix-blend-normal group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* RIGHT: Product Info */}
          {/* 3. Removed any fixed height here. Let it grow naturally. */}
          <div className="flex flex-col gap-8 h-auto">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-wide">
                {productData.name}
              </h1>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex text-yellow-400 text-sm">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>
                <p className="text-gray-400 text-sm">(124 Verified Reviews)</p>
              </div>
            </div>

            <p className="text-3xl font-medium text-blue-300">
              {currency} {productData.price.toLocaleString()}
            </p>

            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              {productData.description}. Crafted for durability and style, this
              piece defines modern comfort.
            </p>

            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-gray-300">Select Size</p>
              <div className="flex flex-wrap gap-3">
                {productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`px-5 py-3 rounded-lg border transition-all duration-200 font-medium
                      ${
                        item === size
                          ? "bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                          : "bg-[#2a2a2a] border-gray-700 text-gray-300 hover:bg-[#333]"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* BUTTON SECTION */}
            <button
              onClick={() => addtoCart(productData._id, size)}
              disabled={loading}
              className="w-full md:w-2/3 bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 active:scale-95 transition-all shadow-lg flex justify-center items-center"
            >
              {loading ? <Loading /> : "ADD TO CART"}
            </button>

            <div className="border-t border-gray-800 pt-6 space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500" /> 100% Original
                Product
              </div>
              <div className="flex items-center gap-3">
                <FaTruck className="text-blue-400" /> Free Delivery & Cash on
                Delivery available
              </div>
              <div className="flex items-center gap-3">
                <FaExchangeAlt className="text-red-400" /> Easy 7-day return and
                exchange
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Description & Reviews Tabs --- */}
      {/* 4. Added explicit margin-top (mt-10) and padding-bottom (pb-20) */}
      <div className="mt-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800 pt-10">
        <div className="flex gap-8 mb-6">
          <button className="text-lg font-bold border-b-2 border-blue-500 pb-1 text-white">
            Description
          </button>
          <button className="text-lg font-bold text-gray-500 hover:text-white transition-colors pb-1">
            Reviews (124)
          </button>
        </div>

        <div className="text-gray-400 text-sm leading-7 space-y-4">
          <p>
            Experience the perfect blend of style and comfort. This product is
            engineered using premium materials that ensure longevity and a
            perfect fit. Whether you are dressing up for an occasion or keeping
            it casual, this is your go-to choice.
          </p>
          <p>
            The fabric is breathable, lightweight, and soft against the skin,
            making it suitable for all-day wear. The precision stitching and
            attention to detail highlight the quality craftsmanship.
          </p>
        </div>
      </div>

      {/* --- Related Products --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-xl font-bold mb-6">Related Products</h2>
        <div className="py-4">
          <RelatedProduct
            category={productData.category}
            subCategory={productData.subCategory}
            currentProductId={productData._id}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
