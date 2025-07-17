import React, { useEffect, useState } from "react";
import logo from "../../assets/ezra_logo.png";
import { MdSearch } from "react-icons/md";
import { useAuth } from "../../Context/AuthContext";
import { RiArrowDropDownLine } from "react-icons/ri";
import EditProfileModal from "../../components/Modal/EditProfileModal";
import { getAuth } from "firebase/auth";

const Topbar = () => {
  const auth = getAuth();
  const { user, userAvatar } = useAuth();
  const userName = user.displayName;
  const [dropdown, setDropdown] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function handleEditProfile() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.async = true;
    document.body.appendChild(script);
    console.log(script);
  });
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
        <div className="w-14 h-14 overflow-hidden rounded-full bg-black text-white text-2xl flex items-center justify-center">
          {auth.currentUser.photoURL ? (
            <img
              className="w-14 h-14 rounded-full"
              src={auth?.currentUser?.photoURL}
              alt={auth?.currentUser?.photoURL}
            />
          ) : (
            <span>{userAvatar} </span>
          )}
        </div>
        <div className="flex items-center justify-center gap-[2px]">
          {userName}
          <div
            onClick={() => setDropdown(!dropdown)}
            className="mt-1 cursor-pointer relative"
          >
            <RiArrowDropDownLine className="" />
            {dropdown ? (
              <div className="absolute top-[240%] right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black/5 z-50">
                <div className="py-1">
                  <button
                    onClick={handleEditProfile}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <EditProfileModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      </div>
    </div>
  );
};

export default Topbar;
