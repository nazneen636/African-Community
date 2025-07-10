import React from "react";
import moment from "moment"; // You can install this via npm/yarn

const PostCard = ({ post }) => {
  return (
    <div className="w-full text-white bg-bg-green326548 rounded-2xl p-5 shadow-md space-y-4">
      {/* Top part: Creator info */}
      <div className="flex items-center gap-4">
        <img
          src={
            post?.postCreatorProfile_picture ||
            "https://i.ibb.co/JcQpXnR/user.png"
          }
          alt="User"
          className="w-10 h-10 rounded-full object-cover border border-white"
        />
        <div>
          <h4 className="font-semibold text-white text-sm">
            {post?.postCreatorName || "Anonymous"}
          </h4>
          <p className="text-xs text-gray-200 opacity-70">
            {moment(post?.createdAt).fromNow()}
          </p>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold">{post?.postTitle}</h3>

      {/* Post image (optional, here just static) */}
      <img
        src={
          post?.postImage ||
          "https://images.pexels.com/photos/17305594/pexels-photo-17305594.jpeg"
        }
        alt="Post"
        className="rounded-xl w-full h-40 object-cover"
      />

      {/* Content */}
      <p className="text-sm opacity-90">{post?.postContent}</p>

      {/* <div className="flex justify-end">
        <button className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-green-700 duration-300 transition-all cursor-pointer">
          Read More
        </button>
      </div> */}
    </div>
  );
};

export default PostCard;
