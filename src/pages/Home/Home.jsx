import React from "react";
import PostCard from "../../Cards/PostCard";
import GroupCard from "../../Cards/GroupCard";
import ProductCard from "../../Cards/ProductCard";
import Heading from "../../components/Home/Heading";

import MemberCard from "../../Cards/MemberCard";

const Home = () => {
  return (
    <div className="flex flex-col w-full justify-center gap-5">
      <Heading />
      <PostCard />
      <GroupCard />
      <ProductCard />
      <MemberCard />
    </div>
  );
};

export default Home;
