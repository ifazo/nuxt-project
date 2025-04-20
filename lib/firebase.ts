// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const stripePromise = loadStripe(config.public.STRIPE_PUBLISHABLE_KEY);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA11K6ANN4b6UVINdOZu1NsM4XQKyYz-80",
  authDomain: "ifaz-nuxt-project.firebaseapp.com",
  projectId: "ifaz-nuxt-project",
  storageBucket: "ifaz-nuxt-project.firebasestorage.app",
  messagingSenderId: "175443418048",
  appId: "1:175443418048:web:4a625d64cdfc8f034a8625",
  measurementId: "G-3SCPD7TJ0C",
};
// const firebaseConfig = {
//   apiKey: config.public.FIREBASE_API_KEY,
//   authDomain: config.public.FIREBASE_AUTH_DOMAIN,
//   projectId: config.public.FIREBASE_PROJECT_ID,
//   storageBucket: config.public.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID,
//   appId: config.public.FIREBASE_APP_ID,
//   measurementId: config.public.FIREBASE_MEASUREMENT_ID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = () => {
  return auth.signOut();
};

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const signInWithGithub = () => {
  return signInWithPopup(auth, githubProvider);
};

export const resetPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};
