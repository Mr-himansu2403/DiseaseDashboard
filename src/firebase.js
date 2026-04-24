// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZChEh42bUmU--8kd-DEkcCSoqbzXxY58",
  authDomain: "gibud-f7cc9-17806.firebaseapp.com",
  projectId: "gibud-f7cc9-17806",
  storageBucket: "gibud-f7cc9-17806.firebasestorage.app",
  messagingSenderId: "755993457513",
  appId: "1:755993457513:web:6778b6dfefb6f8e563c3f8",
  measurementId: "G-DZRZKF1GTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export const storeDiseaseData = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "Diecue_kit"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export { app, db, auth, analytics };
