import { getDatabase, ref, onValue, get } from "firebase/database";
import { useEffect, useState } from "react";
import { data } from "react-router-dom";

export const useFetchData = (dbName) => {
  const [fetch, setFetch] = useState({ data: [], error: null, loading: true });

  useEffect(() => {
    const db = getDatabase();
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(db, dbName));
        if (snapshot.exists()) {
          let blankArr = [];
          snapshot.forEach((item) => {
            blankArr.push({
              ...item.val(),
              id: item.key,
            });
          });
          setFetch({ data: blankArr, error: null, loading: false });
          console.log(fetch.data);
        } else {
          setFetch({ data: blankArr, error: null, loading: false });
        }
      } catch (error) {
        setFetch({ data: [], error, loading: false });
        console.error("Firebase fetch error:", error);
      }
    };
    fetchData();
  }, [dbName]);
  return fetch;
};
