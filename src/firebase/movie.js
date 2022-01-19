import { collection, getDoc, getDocs, setDoc, doc } from 'firebase/firestore/lite';
import { db } from './db';

const commentsRef = collection(db, 'comment');

export const getComments = async (movieID) => {
    try {
        const commentSnap = await getDoc(doc(commentsRef, movieID));
        if (commentSnap) return commentSnap.data().comment;
    } catch (err) {
        console.log(err);
        return [];
    }
};
