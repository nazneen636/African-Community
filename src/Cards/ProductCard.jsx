// ProductCard.jsx
import React from "react";

const ProductCard = () => {
  return (
    <div className="max-w-sm text-white bg-bg-green326548 rounded-xl p-4 shadow-lg">
      <img
        src="https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg"
        alt="Product"
        className="rounded-lg w-full h-48 object-cover"
      />
      <h4 className="mt-4 text-2xl font-bold">Product Name</h4>
      <p className="text-sm opacity-70">Short product description goes here.</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold text-yellow-500">$29.99</span>
        <button className="px-3 py-1 bg-yellow-500  text-black rounded hover:bg-green-700 duration-300 transition-all cursor-pointer">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
