import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../Hooks/useFetchData";
import { joinGroup } from "../../utils/joinGroup.utils";
import { useAuth } from "../../Context/AuthContext";

const GroupDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  console.log(user, "user");

  const { data, loading, error } = useFetchData("groups");
  const [joined, setJoined] = useState(false);
  const group = data?.find((g) => g.id == id);
  console.log(group);

  const handleJoinGroup = async () => {
    try {
      await joinGroup(user.uid, id);
      setJoined(true);
    } catch (err) {
      console.log(err);
    }
  };
  if (loading || !group) return <div>Loading...</div>;
  return (
    <div className="w-full mx-auto rounded-xl bg-[#326548b7]">
      {/* Group Banner & Info */}
      <div className="bg-white rounded-tl-xl rounded-t-xl shadow-lg p-6 mb-1">
        <div className="mb-4 rounded-xl overflow-hidden">
          <img
            src={
              group?.groupProfile ||
              "https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg"
            }
            alt="Group Banner"
            className="w-full h-60 object-cover "
          />
          <div className="bg-yellow-500 text-lg py-2 px-4 font-semibold text-gray-700">
            Group by {group?.adminName}
          </div>
        </div>
        {/* about this group */}
        <div className="bg-white rounded-xl shadow px-4 py-3 mb-4">
          <h2 className="text-xl font-semibold mb-3">About this group</h2>
          <p className="text-gray-700 leading-relaxed">{group?.groupAbout}</p>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-2 mt-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {group?.groupTitle}
            </h1>
            <p className="text-sm text-gray-600 mt-1">#{group?.groupTag}</p>
            <span className="text-xs text-gray-700 bg-yellow-500 px-3 py-1 rounded-full mt-2 inline-block font-semibold">
              {group?.groupType}
            </span>
          </div>

          <div className="flex gap-5">
            <button
              onClick={handleJoinGroup}
              className="px-5 py-2 rounded-lg bg-green-600 hover:bg-bg-green326548 text-white font-semibold transition"
            >
              Member
            </button>
            {joined ? (
              <button
                onClick={handleJoinGroup}
                className="px-5 py-2 rounded-lg bg-green-600 hover:bg-bg-green326548 text-white font-semibold transition"
              >
                Leave Group
              </button>
            ) : (
              <button
                onClick={handleJoinGroup}
                className="px-5 py-2 rounded-lg bg-green-600 hover:bg-bg-green326548 text-white font-semibold transition"
              >
                Join Group
              </button>
            )}
          </div>
        </div>
      </div>

      {/* About Section */}

      <div className="px-40 mt-8">
        {/* Posts Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Posts</h2>

          {/* Post input area (design only) */}
          <form className="mb-6 space-y-3">
            <textarea
              placeholder="Write something..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-green-300"
              rows="3"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-bg-green326548 transition text-white px-4 py-[6px] font-semibold rounded-lg"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
