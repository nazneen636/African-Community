import React from "react";
import { BiStore } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { HiMiniBars3 } from "react-icons/hi2";
import { SlHome } from "react-icons/sl";
import { TbManFilled } from "react-icons/tb";
import { NavLink } from "react-router-dom";
const menuItem = [
  {
    id: 1,
    icon: <HiMiniBars3 />,
    name: "",
    path: "",
  },
  {
    id: 2,
    icon: <SlHome />,
    name: "Home",
    path: "/",
  },
  {
    id: 3,
    icon: <BiStore />,
    name: "Community Store",
    path: "/store",
  },
  {
    id: 4,
    icon: <TbManFilled />,
    name: "Members",
    path: "/member",
  },
  {
    id: 5,
    icon: <FaUserGroup />,
    name: "Groups",
    path: "/group",
  },
];

const SideBar = () => {
  return (
    <div className="w-14 bg-bg-green326548 fixed px-4 py-8 h-screen">
      <div className="flex flex-col gap-6">
        {menuItem?.map((item, index) =>
          index === 0 ? (
            <div key={item.id} className={` text-lg  mb-16 text-white `}>
              {item.icon}
            </div>
          ) : (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                ` text-base text-white ${index === 0 ? "mb-16" : ""} ${
                  isActive ? "opacity-70" : "opacity-100"
                }`
              }
            >
              {item.icon}
            </NavLink>
          )
        )}
      </div>
    </div>
  );
};

export default SideBar;
