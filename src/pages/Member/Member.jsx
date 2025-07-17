// import React from "react";
import { useFetchData } from "../../Hooks/useFetchData";
import MemberCard from "../../Cards/MemberCard";

const Member = () => {
  const { data, error, loading } = useFetchData("users");
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.map((member) => (
        <div key={member.id} className="">
          <MemberCard member={member} />
        </div>
      ))}
    </div>
  );
};

export default Member;
