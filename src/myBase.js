import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


//firebase에 접속하기 위해 필요한 값들
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_API_ID
  };

firebase.initializeApp(firebaseConfig);

// Firebase 서비스에 액세스하는 전역 네임스페이스
export const firebaseInstance = firebase;
//Firebase 인증 서비스 인터페이스
export const authService = firebase.auth();
//firebase의 firestore기능
export const dbService = firebase.firestore();
//firebase의 storage기능
export const storageService = firebase.storage();