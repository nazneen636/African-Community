import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import { AuthContext } from "../Context/AuthContext";
import NotSignedIn from "./ErrorPage/NotSignIn";
import NotVerified from "./ErrorPage/NotVerified";
import { useAuth } from "../Context/AuthContext";
import SideBar from "../pages/Home/SideBar";
import Topbar from "../pages/Home/Topbar";

const RootLayout = () => {
  const { user, isVerified } = useAuth();

  let content = null;
  if (!user) {
    content = <NotSignedIn />;
  } else if (!isVerified) {
    content = <NotVerified />;
  } else {
    content = (
      <div className="flex w-full">
        <SideBar />
        <div className="w-full">
          <Topbar />
          <div className="flex items-center justify-center">
            <div className="mt-12 min-h-[79.6vh] max-w-[1200px] flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* <nav>nav</nav> */}
      <div className="bg-linear-to-l from-[#265038] to-[#c39f0e]">
        {content}
      </div>
    </div>
  );
};

export default RootLayout;
