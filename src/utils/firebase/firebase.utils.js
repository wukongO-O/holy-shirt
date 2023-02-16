import { initializeApp } from 'firebase/app';
//create a google sign in w the libraries
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAhGLxgOdcYy8pi9eNOsmS88q5M3H5J300",
    authDomain: "holy-shirt-db.firebaseapp.com",
    projectId: "holy-shirt-db",
    storageBucket: "holy-shirt-db.appspot.com",
    messagingSenderId: "939761467680",
    appId: "1:939761467680:web:fa0fcc8467f29532e15745"
  };
  
// Initialize Firebase - identify the sdk
const firebaseApp = initializeApp(firebaseConfig);

//initialize the provider w Google's class to a provider instance
//use 'prompt' - every interaction w provider, force user to select an account
const provider= new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch(error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
}