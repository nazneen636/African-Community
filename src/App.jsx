import React from "react";
import RootLayout from "./components/RootLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import AuthProvider from "./Context/AuthContext";
import Member from "./pages/Member/Member";
import Group from "./pages/Group/Group";
import GroupDetails from "./pages/Group/[id]";
import Store from "./pages/store/Store";

const App = () => {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/member" element={<Member />} />
        <Route path="/store" element={<Store />} />
        <Route path="/group" element={<Group />} />
        <Route path="/group/:id" element={<GroupDetails />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
    // </BrowserRouter>
  );
};

export default App;
