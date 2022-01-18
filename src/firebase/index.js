import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore/lite';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyB136Bs-cxhePh4G8cdnbVbYWdEJhKfavM',
    authDomain: 'nnnetflix-1fa03.firebaseapp.com',
    projectId: 'nnnetflix-1fa03',
    storageBucket: 'nnnetflix-1fa03.appspot.com',
    messagingSenderId: '429984548654',
    appId: '1:429984548654:web:2f19f41688c3c35f699cbf',
    measurementId: 'G-P3C584XLB3',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const SignInWithGoogle = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await signInWithPopup(auth, provider);
            const { uid, displayName, photoURL, email } = user.user;
            if (user) {
                const userRef = collection(db, 'user');
                await setDoc(doc(userRef, uid), {
                    userName: displayName,
                    photoURL,
                    email,
                });
                resolve(user);
            }
        } catch (err) {
            reject(err);
        }
    });
};
export const Logout = () => {
    auth.signOut();
};
