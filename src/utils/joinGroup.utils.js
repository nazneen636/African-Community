import {
  getDatabase,
  off,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
const db = getDatabase();
export const joinGroup = async (userId, groupId) => {
  try {
    await set(ref(db, `joinGroup/${userId}/${groupId}`), true);
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

export const leaveGroup = async (userId, groupId) => {
  try {
    await remove(ref(db, `joinGroup/${userId}/${groupId}`));
    return true;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Real-time listener to check if user joined a group
export const watchGroupJoined = (userId, groupId, callback) => {
  const groupRef = ref(db, `joinGroup/${userId}/${groupId}`);

  // Listen for real-time changes
  const unsubscribe = onValue(groupRef, (snapshot) => {
    const joined = snapshot.exists();
    callback(joined); // returns true or false
  });

  // Return an unsubscribe function to detach the listener
  return () => off(groupRef);
};
