import { get, getDatabase, ref } from "firebase/database";
const db = getDatabase();
export const getMemberCount = async (groupId) => {
  try {
    const countRef = ref(db, `joinGroup`);
    const snapshot = await get(countRef);

    let count = 0;
    if (snapshot.exists()) {
      snapshot.forEach((item) => {
        const group = item.val();

        if (group && group[groupId] == true) {
          count++;
        }
      });
    }
    return count;
  } catch (err) {
    console.log("Error fetching member count:", err);
    return 0;
  }
};
