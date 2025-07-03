// GroupCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const GroupCard = ({ group }) => {
  return (
    <Link to={`/group/${group?.id}`}>
      <div className="max-w-sm bg-bg-green326548 text-white rounded-2xl p-6 shadow-lg space-y-4">
        <span className="bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-semibold inline-block">
          {group?.groupType}
        </span>
        <h2 className="text-2xl font-bold">{group?.groupTitle}</h2>
        <p className="text-sm text-gray-200">{group?.groupTag}</p>
        <img
          src={
            group?.groupProfile ||
            "https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg"
          }
          alt={group?.groupTitle}
          className="rounded-xl w-full h-48 object-cover"
        />
      </div>
    </Link>
  );
};

export default GroupCard;
