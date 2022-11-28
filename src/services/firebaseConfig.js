import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKY6J6L4AUom9ETXgL_OFksXHbVmrzNVc",
  authDomain: "chat-67daf.firebaseapp.com",
  projectId: "chat-67daf",
  storageBucket: "chat-67daf.appspot.com",
  messagingSenderId: "694438129140",
  appId: "1:694438129140:web:a8c283abf7280b63fa9da1"
};

export const app = initializeApp(firebaseConfig);
export const databaseApp = getFirestore(app);
