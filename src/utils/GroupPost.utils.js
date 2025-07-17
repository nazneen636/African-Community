import { getDatabase, push, ref } from "firebase/database";
import lib from "../lib/lib";

const db = getDatabase();
export const groupPost = async (
  groupId,
  postCreatorID,
  postCreatorName,
  postCreatorEmail,
  postCreatorProfile_picture,
  postTitle,
  postContent,
  postImage
) => {
  try {
    await push(ref(db, `groupPost/${groupId}`), {
      postCreatorID,
      postCreatorName,
      postCreatorEmail,
      postCreatorProfile_picture,
      postTitle,
      postContent,
      postImage,
      createdAt: Date.now(),
    });
    lib.SuccessToast("Post created successfully");
  } catch (err) {
    console.log("Error in post create", err);
    lib.ErrorToast("Error creating post");
  }
};
