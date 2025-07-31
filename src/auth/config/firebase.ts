import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const API_KEY: string = import.meta.env.VITE_FIREBASE_API_KEY as string;
const AUTH_DOMAIN: string = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string;
const PROJECT_ID: string = import.meta.env.VITE_FIREBASE_PROJECT_ID as string;
const STORAGE_BUCKET: string = import.meta.env
    .VITE_FIREBASE_STORAGE_BUCKET as string;
const MESSAGE_SENDER: string = import.meta.env
    .VITE_FIREBASE_MESSAGE_SENDER_ID as string;
const APP_ID: string = import.meta.env.VITE_FIREBASE_APP_ID as string;

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGE_SENDER,
    appId: APP_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
