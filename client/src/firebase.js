import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByErV9DV2iy5kxTBoOh2DAXj8Z3lwG9fw",
  authDomain: "myapp-c5d0f.firebaseapp.com",
  projectId: "myapp-c5d0f",
  storageBucket: "myapp-c5d0f.appspot.com",
  messagingSenderId: "479992234562",
  appId: "1:479992234562:web:61d460ea09b0853cc763db"
};
 export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export { auth };

