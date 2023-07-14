import { initializeApp } from "@firebase/app";
import { getAnalytics } from "@firebase/analytics";
import { getAuth } from "@firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCuc8pv5dI1wLZf4UNeWAdFJFUxSE5Hgec",
  authDomain: "newsmanagement-392811.firebaseapp.com",
  projectId: "newsmanagement-392811",
  storageBucket: "newsmanagement-392811.appspot.com",
  messagingSenderId: "233133646705",
  appId: "1:233133646705:web:4008548581160cdcc4ccd0",
  measurementId: "G-R5RB16DG47"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

