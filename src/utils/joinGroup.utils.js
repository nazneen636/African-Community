import { getDatabase, push, ref, set } from "firebase/database";
const db = getDatabase();
export const joinGroup = async (userId, groupId) => {
  try {
    await set(ref(db, `/joinGroup/${userId}${groupId}`), true);
    return true;
  } catch (err) {
    throw new Error(err);
  }
};
