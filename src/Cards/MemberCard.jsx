// components/MemberCard.jsx
import React from "react";

const MemberCard = ({ member }) => {
  return (
    <div className="bg-bg-green326548 text-white rounded-xl shadow-md p-5 text-center  hover:shadow-lg transition ">
      <img
        src={member?.profile_picture}
        alt={member?.userName}
        className="w-24 h-24 flex items-center justify-center rounded-full mx-auto object-cover mb-4 border border-white"
      />
      <h3 className="text-lg font-semibold">{member?.userName}</h3>
      <h3 className="text-lg font-semibold opacity-65 text-sm">
        {member?.userEmail}
      </h3>
      <p className="text-sm">{member?.role}</p>
    </div>
  );
};

export default MemberCard;
