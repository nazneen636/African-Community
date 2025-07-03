import { getDatabase, push, ref, set } from "firebase/database";
import app from "../../Database/Firebase.config";
export const uploadFile = async (body) => {
  try {
    if (!body) return;
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dzfesj1vk/image/upload",
      {
        method: "POST",
        body,
      }
    );
    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    throw new Error("Upload failed from cloudinary");
  }
};

// upload file into firebaseData database
const db = getDatabase(app);
export const setFirebaseData = async (dbName, data) => {
  try {
    await set(push(ref(db, dbName)), data);
    return true;
  } catch (err) {
    throw new Error("Upload firebase data failed");
  }
};
