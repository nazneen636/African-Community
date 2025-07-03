// PostCard.jsx
import React from "react";

const PostCard = () => {
  return (
    <div className="max-w-sm text-white bg-bg-green326548 text-gray-900 rounded-2xl p-5 shadow-md space-y-4">
      <img
        src="https://images.pexels.com/photos/17305594/pexels-photo-17305594.jpeg"
        alt="Post"
        className="rounded-xl w-full h-40 object-cover"
      />
      <h3 className="text-2xl font-semibold">Exciting Post Title</h3>
      <p className="text-sm opacity-65">
        A short preview of the post goes here. This is a snippet.
      </p>
      <button className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-green-700 duration-300 transition-all cursor-pointer">
        Read More
      </button>
    </div>
  );
};

export default PostCard;
