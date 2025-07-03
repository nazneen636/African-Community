import React from "react";
import logo from "../../assets/ezra_logo.png";
import { MdSearch } from "react-icons/md";
import { useAuth } from "../../Context/AuthContext";
import { BiDownArrow } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";

const Topbar = () => {
  const { user, userAvatar } = useAuth();
  const userName = user.displayName;
  const isImage =
    userAvatar.startsWith("http") || userAvatar.startsWith("https");
  console.log(userAvatar, "topbar");

  return (
    <div className="flex items-center text-white justify-between w-full px-5 py-3 shadow-lg border-b border-b-[#ffffff76]">
      <picture className="ml-6">
        <img src={logo} alt="logo" className="h-12" />
      </picture>

      <div className="flex gap-3 items-center">
        <div className="relative mr-10">
          <input
            type="search"
            placeholder="Search..."
            className="bg-white text-black border-none outline-none focus:outline-none py-2 px-4 rounded-full placeholder:text-gray-500"
          />
          <MdSearch className="text-xl absolute right-8 top-1/2 -translate-y-1/2 text-gray-700" />
        </div>
        <div className="w-14 h-14 rounded-full bg-black text-white text-2xl flex items-center justify-center">
          <span>{userAvatar} </span>
        </div>
        <div className="flex items-center justify-center gap-[2px]">
          {userName}
          <div className="mt-1 cursor-pointer">
            <RiArrowDropDownLine className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
