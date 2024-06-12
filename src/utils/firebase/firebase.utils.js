import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB9WYx24NGqwS3cQNsYm-BTBEAn9dITWIs",
    authDomain: "crwn-clothing-db-a6eff.firebaseapp.com",
    projectId: "crwn-clothing-db-a6eff",
    storageBucket: "crwn-clothing-db-a6eff.appspot.com",
    messagingSenderId: "567212567973",
    appId: "1:567212567973:web:3a396b179f485dca0f0c4c"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => 
    signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => 
    signInWithRedirect(auth, googleProvider);

  export const db = getFirestore()

  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {displayName: 'mike'}
  ) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
      const { displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error creating the user', error.message)
      }
    }

    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  };