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


export const watchGroupJoined = (userId, groupId, callback) => {
  const groupRef = ref(db, `joinGroup/${userId}/${groupId}`);

  const unsubscribe = onValue(groupRef, (snapshot) => {
    const joined = snapshot.exists();
    callback(joined);
  });

  return () => off(groupRef);
};
