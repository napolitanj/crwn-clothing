import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB9WYx24NGqwS3cQNsYm-BTBEAn9dITWIs",
    authDomain: "crwn-clothing-db-a6eff.firebaseapp.com",
    projectId: "crwn-clothing-db-a6eff",
    storageBucket: "crwn-clothing-db-a6eff.appspot.com",
    messagingSenderId: "567212567973",
    appId: "1:567212567973:web:3a396b179f485dca0f0c4c"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);