    // import firebase from 'firebase/compat/app';
    // import 'firebase/compat/firestore';
    // import 'firebase/compat/auth';

    import firebase from 'firebase/compat/app';
    import 'firebase/compat/auth';
    import 'firebase/compat/messaging';
    import 'firebase/compat/firestore';

// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChJbLxrsLRsgLVvOHeDn-wekMwaAkbLp0",
  authDomain: "netflix-1c4fb.firebaseapp.com",
  projectId: "netflix-1c4fb",
  storageBucket: "netflix-1c4fb.appspot.com",
  messagingSenderId: "951680186938",
  appId: "1:951680186938:web:786d0af916b2290a125303",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;  