import firebase from "firebase/app";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_AUTH_DOMAIN,
});

export default firebase;

// firebase.initializeApp({
//   apiKey: "AIzaSyDi6-hnBrCXaE2dSG_9BSeuTReDxuUoxUA",
// authDomain: "mubaraa-edaf4.firebaseapp.com",
// projectId: "mubaraa-edaf4",
// storageBucket: "mubaraa-edaf4.appspot.com",
// messagingSenderId: "238598170864",
// appId: "1:238598170864:web:a7989ecc67b67d95313a35",
// measurementId: "G-PY3VDWJE71"
// })
