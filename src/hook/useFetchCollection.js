import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCollection = () => {
    setIsLoading(true);
    try {
      const docRef = collection(db, collectionName);

      const q = query(docRef, orderBy("createdAt", "desc"));

      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          /* createdAt:
            typeof doc.data().createdAt === "string"
              ? doc.data().createdAt
              : `${doc.data().createdAt.toDate()}`, */
        }));

        setData(allData);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getCollection();
  }, []);
  return { data, isLoading };
};

export default useFetchCollection;
