import { collection, getDoc, getDocs, setDoc, doc, updateDoc } from 'firebase/firestore';

import { db } from './db';

export const usersRef = collection(db, 'user');

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
    await setDoc(
        doc(usersRef, uid),
        {
            userName: displayName,
            photoURL,
            email,
        },
        { merge: true }
    );
};

export const getCurrentLikeList = async (userID) => {
    const userSnap = await getDoc(doc(usersRef, userID));
    return userSnap.data().like ? userSnap.data().like : [];
};
export const getCurrentCollectList = async (userID) => {
    const userSnap = await getDoc(doc(usersRef, userID));
    return userSnap.data().collect ? userSnap.data().collect : [];
};

export const setLikeList = async (userID, movieID) => {
    let likes = await getCurrentLikeList(userID);
    // if exist delete it else add it
    likes.includes(movieID) ? likes.splice(likes.indexOf(movieID), 1) : likes.push(movieID);
    await updateDoc(doc(usersRef, userID), {
        like: likes,
    });
};
export const setCollectList = async (userID, movieID) => {
    let collects = await getCurrentCollectList(userID);
    // if exist delete it else add it
    collects.includes(movieID) ? collects.splice(collects.indexOf(movieID), 1) : collects.push(movieID);
    await updateDoc(doc(usersRef, userID), {
        collect: collects,
    });
};

export const isLike = async (userID, movieID) => {
    const likes = await getCurrentLikeList(userID);
    return likes.includes(movieID);
};

export const isCollect = async (userID, movieID) => {
    const collects = await getCurrentCollectList(userID);
    return collects.includes(movieID);
};
