// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8YpH2SVaJvK3tTn9GhsRNLHpz3aQMKQ0",
  authDomain: "disease-dashboard-44198.firebaseapp.com",
  projectId: "disease-dashboard-44198",
  storageBucket: "disease-dashboard-44198.firebasestorage.app",
  messagingSenderId: "202618355743",
  appId: "1:202618355743:web:b2e57db89d8a4eb479d52a",
  measurementId: "G-ZF5B32KZ39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics safely
let analytics = null;
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

const db = getFirestore(app);

/**
 * Stores data in the "Diecue_kit" collection.
 * @param {Object} data - The data to store.
 */
export const storeDiseaseData = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "Diecue_kit"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export { app, db, analytics };
