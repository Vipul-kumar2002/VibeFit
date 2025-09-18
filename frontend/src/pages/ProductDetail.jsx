import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from "../component/RelatedProduct";
import Loading from "../component/Loading";

function ProductDetail() {
  let { productId } = useParams();
  let { products, currency, addtoCart, loading } = useContext(shopDataContext);

  let [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage1(item.image1);
        setImage2(item.image2);
        setImage3(item.image3);
        setImage4(item.image4);
        setImage(item.image1);
      }
    });
  }, [productId, products]);

  return productData ? (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center px-2 py-8">
      {/* Main Card Section */}
      <div className="flex flex-col lg:flex-row gap-10 bg-white/5 backdrop-blur-xl border border-[#1e293b66] rounded-3xl shadow-2xl p-6 md:p-10 w-full max-w-7xl my-4">
        {/* Images Block */}
        <div className="flex flex-col lg:flex-row gap-8 lg:w-1/2 items-center">
          <div className="flex lg:flex-col gap-4">
            {[image1, image2, image3, image4].map((img, i) => (
              <button
                key={i}
                onClick={() => setImage(img)}
                className="border border-[#66636a80] bg-[#232b2e] rounded-xl w-14 h-14 md:w-20 md:h-24 overflow-hidden shadow hover:ring-2 ring-[#0fa1dd] focus:ring-4 transition-all"
              >
                <img src={img} alt="" className="w-full h-full object-cover rounded-xl" />
              </button>
            ))}
          </div>
          <div className="border border-[#66636a80] rounded-2xl overflow-hidden shadow-lg w-[260px] md:w-[350px] lg:w-[420px] h-[250px] md:h-[320px] lg:h-[480px] flex items-center justify-center bg-black/20">
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        {/* Details Block */}
        <div className="flex flex-col gap-5 lg:w-1/2 py-2 px-2">
          <h1 className="text-3xl md:text-5xl font-semibold text-[#f5fcff] mb-3">{productData.name.toUpperCase()}</h1>
          <div className="flex items-center gap-2 mb-2">
            {[...Array(4)].map((_, idx) => (
              <FaStar key={idx} className="text-xl md:text-2xl fill-[#FFD700]" />
            ))}
            <FaStarHalfAlt className="text-xl md:text-2xl fill-[#FFD700]" />
            <span className="text-lg text-[#8cfade] font-semibold pl-2">(124)</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-[#b6ecff] mb-2">
            {currency} {productData.price}
          </div>
          <p className="w-full max-w-xl text-lg md:text-xl text-[#e7f8fd] bg-white/10 rounded-xl py-3 px-4">{productData.description} Stylish, breathable cotton shirt with modern slim fit. Easy to wash, super comfortable, and designed for effortless style.</p>
          <div className="flex flex-col gap-3 mt-5">
            <span className="text-xl text-[#c5eaff] font-semibold">Select Size</span>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-5 rounded-lg font-semibold transition-all
                    ${item === size ? "bg-[#0e2c33] text-[#2f97f1] scale-105 shadow-lg border-[#2f97f1]" : "bg-[#e0e7ef] text-[#212b35] hover:bg-[#242b2e] hover:text-[#87cfff]"}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              className="text-lg font-bold bg-gradient-to-r from-[#2d98f0c9] to-[#61e0d8c9] py-3 px-6 rounded-full shadow-lg mt-3 border border-[#80808049] text-white hover:shadow-2xl active:bg-slate-600 transition-all"
              onClick={() => addtoCart(productData._id, size)}
            >
              {loading ? <Loading /> : "Add to Cart"}
            </button>
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-[#556371c9] via-[#3336397c] to-[#2225297c] my-4"></div>
          <ul className="text-base text-[#c7f7fb] flex flex-col gap-2 mt-1 ml-2">
            <li>100% Original Product</li>
            <li>Cash on delivery available</li>
            <li>Easy return and exchange within 7 days</li>
          </ul>
        </div>
      </div>
      {/* Description and Reviews Section */}
      <div className="w-full max-w-6xl pb-10">
        <div className="flex gap-2 px-6 pt-7">
          <span className="border px-4 py-2 text-white rounded-t-xl bg-black/20">Description</span>
          <span className="border px-4 py-2 text-white rounded-t-xl bg-black/20">Reviews (124)</span>
        </div>
        <div className="w-full bg-white/5 backdrop-blur-md border border-[#3336397c] rounded-2xl p-6 my-2 text-[#e3eeff] text-base md:text-lg shadow-lg">
          Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on VibeFit. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting.
        </div>
      </div>
      {/* Related Products */}
      <div className="w-full bg-gradient-to-l from-[#141414] to-[#0c2025] py-8">
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default ProductDetail;
