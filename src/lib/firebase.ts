import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-XaY3bIaNXnhZ2_Y5hq0xzkYVBl4am7M",
  authDomain: "wedding-d0bb2.firebaseapp.com",
  projectId: "wedding-d0bb2",
  storageBucket: "wedding-d0bb2.firebasestorage.app",
  messagingSenderId: "904910491817",
  appId: "1:904910491817:web:823b3189a6547d57f019b8"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getFirestore(app);
