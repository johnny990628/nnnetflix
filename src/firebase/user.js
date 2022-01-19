import { collection, getDoc, getDocs, setDoc, doc } from 'firebase/firestore/lite';
import { db } from './db';

const usersRef = collection(db, 'user');

export const getUsers = async () => {
    const usersSnap = await getDocs(usersRef);
    if (usersSnap) {
        return usersSnap.docs.map((user) => user.data());
    }
};

export const getUser = async (userID) => {
    const userSnap = await getDoc(doc(usersRef, userID));
    return userSnap.data();
};

export const setUser = async ({ uid, displayName, photoURL, email }) => {
    await setDoc(doc(usersRef, uid), {
        userName: displayName,
        photoURL,
        email,
    });
};
