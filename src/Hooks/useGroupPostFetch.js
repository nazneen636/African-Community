import { getDatabase, ref, get } from "firebase/database";
import { useEffect, useState } from "react";

export const useGroupPostDataFetch = (dbName) => {
  const [fetch, setFetch] = useState({ data: {}, error: null, loading: true });

  useEffect(() => {
    const db = getDatabase();
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(db, dbName));
        if (snapshot.exists()) {
          const fetchedData = snapshot.val(); 
          setFetch({ data: fetchedData, error: null, loading: false });
        } else {
          setFetch({ data: {}, error: null, loading: false });
        }
      } catch (error) {
        setFetch({ data: {}, error, loading: false });
        console.error("Firebase fetch error:", error);
      }
    };
    fetchData();
  }, [dbName]);

  return fetch;
};
