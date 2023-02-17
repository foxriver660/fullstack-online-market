
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCrTXeMBfQWJHGueWszfSxFuCn8lmShs9Q",
  authDomain: "eshop-32819.firebaseapp.com",
  projectId: "eshop-32819",
  storageBucket: "eshop-32819.appspot.com",
  messagingSenderId: "640144096541",
  appId: "1:640144096541:web:34834957197b1eac1635f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
