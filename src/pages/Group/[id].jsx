import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../Hooks/useFetchData";
import lib from "../../lib/lib";
import {
  joinGroup,
  leaveGroup,
  watchGroupJoined,
} from "../../utils/joinGroup.utils";
import { useAuth } from "../../Context/AuthContext";
import { getMemberCount } from "../../utils/GetGroupMember.utils";
import { groupPost } from "../../utils/GroupPost.utils";
import { onChangeHandler } from "../../utils/OnChangeHandler.utils";
import { handleValidation } from "../../utils/Validation.utils";
import PostCard from "../../Cards/PostCard";
import { useGroupPostDataFetch } from "../../Hooks/useGroupPostFetch";
import { FaImage } from "react-icons/fa";
import { uploadFile } from "../../utils/upload.utils";

const GroupDetails = () => {
  const [postInfo, setPostInfo] = useState({
    postContent: "",
    postTitle: "",
    postImage: "",
  });
  const [postError, setPostError] = useState({});
  const [posting, setPosting] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  console.log(user, "user");

  const { data, loading } = useFetchData("groups");
  const { data: allPost, loading: postLoading } =
    useGroupPostDataFetch("groupPost");
  const [isJoined, setIsJoined] = useState(false);
  const group = data?.find((g) => g.id == id);
  console.log(group);

  // is joined or not
  useEffect(() => {
    if (!user?.uid || !id) return;

    const unsubscribe = watchGroupJoined(user.uid, id, setIsJoined);
    return () => unsubscribe();
  }, [user?.uid, id]);

  // member count
  const [memberCount, setMemberCount] = useState(0);
  useEffect(() => {
    const fetchMemberCount = async () => {
      const count = await getMemberCount(id);
      setMemberCount(count);
      console.log(count);
    };

    if (id) {
      fetchMemberCount();
    }
  }, [id]);

  // handle join group
  const handleJoinGroup = async () => {
    try {
      await joinGroup(user.uid, id);
      // setJoined(true);
    } catch (err) {
      console.log(err);
    }
  };

  // handle leave group
  const handleLeaveGroup = async () => {
    try {
      await leaveGroup(user.uid, id);
    } catch (err) {
      console.log(err);
    }
  };

  // group posts
  const allGroupPost = allPost?.[id]
    ? Object.entries(allPost[id])
        .map(([postId, postData]) => ({
          id: postId,
          ...postData,
        }))
        .sort((a, b) => b.createdAt - a.createdAt)
    : [];

  // handle Create Post
  const handleCreatePost = async () => {
    const isValid = handleValidation(postInfo, setPostError);
    if (!isValid) {
      console.log(postError, "error");
      // lib.ErrorToast("Creating post is error");
      handleValidation(postInfo, setPostError);
    }
    const formData = new FormData();
    formData.append("file", postInfo.postImage);
    formData.append("upload_preset", "Nazneen");
    try {
      setPosting(true);
      const url = await uploadFile(formData);
      await groupPost(
        id,
        user.uid,
        user.displayName || "missing",
        user.email || "missing",
        user.photoURL || "profile",
        postInfo.postTitle || "",
        postInfo.postContent || "",
        url || "post image missing"
      );
    } catch (err) {
      console.log((err, "err in create post"));
    } finally {
      setPostInfo({ postContent: "", postTitle: "" });
      setPosting(false);
    }
  };

  if (loading || !group) return <div>Loading...</div>;
  return (
    <div className="w-full mx-auto rounded-xl bg-[#326548b7] pb-6 mb-3">
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
            <button className="px-5 py-2 rounded-lg bg-green-600 hover:bg-bg-green326548 text-white font-semibold transition">
              Member {memberCount}
            </button>
            {isJoined ? (
              <button
                onClick={handleLeaveGroup}
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

      {/* Posts Section */}

      <div className="px-40 mt-8 ">
        {isJoined ? (
          <div className="">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Posts</h2>

              {/* Post input area (design only) */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mb-6 space-y-3"
              >
                <div className="relative">
                  <input
                    type="text"
                    onChange={(e) =>
                      onChangeHandler(e, setPostInfo, setPostError)
                    }
                    name="postTitle"
                    value={postInfo.postTitle}
                    placeholder="Post title"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-green-300"
                  />
                  {postError?.postTitleError && (
                    <p className="text-red-600 absolute left-0 top-full capitalize">
                      {postError.postTitleError}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <textarea
                    onChange={(e) =>
                      onChangeHandler(e, setPostInfo, setPostError)
                    }
                    name="postContent"
                    value={postInfo.postContent}
                    placeholder="Write something..."
                    className="mt-5 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-green-300"
                    rows="3"
                  />
                  {/* Image Icon (triggers file input) */}
                  <FaImage
                    onClick={() => document.getElementById("postImage").click()}
                    className="absolute top-[70%] left-4 text-blue-500 text-xl cursor-pointer"
                  />

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    id="postImage"
                    name="postImage"
                    className="hidden"
                    onChange={(e) =>
                      onChangeHandler(e, setPostInfo, setPostError)
                    }
                  />
                  {postError?.postContentError && (
                    <p className="text-red-600 absolute left-0 top-full capitalize">
                      {postError.postContentError}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  onClick={handleCreatePost}
                  className="mt-5 bg-green-600 hover:bg-bg-green326548 transition text-white px-4 py-[6px] font-semibold rounded-lg"
                >
                  {posting ? "Posting..." : "Post"}
                </button>
              </form>
            </div>

            {/* all post */}
            <div className="mt-8  w-full bg-white rounded-xl px-8  py-6">
              <h1 className="text-center text-4xl text-gray-700 my-2 font-bold">
                All Post
              </h1>
              {groupPost.length <= 0 ? (
                <div className="bg-white rounded-xl p-6 text-center">
                  No post to show
                </div>
              ) : (
                allGroupPost?.map((item) => (
                  <div key={item.id} className="mt-6 ">
                    <PostCard post={item} />
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 text-center">
            No member yet
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetails;
