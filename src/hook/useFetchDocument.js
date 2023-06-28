import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

const useFetchDocument = (collection, documentId) => {
  const [document, setDocument] = useState();

  const getDocument = async () => {
    const docRef = doc(db, collection, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDocument({ ...docSnap.data(), id: documentId });
    } else {
      toast.error("Документ не найден");
    }
  };
  useEffect(() => {
    getDocument();
  }, []);
  return { document };
};

export default useFetchDocument;
