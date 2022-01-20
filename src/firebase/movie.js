import { collection, getDoc, getDocs, setDoc, updateDoc, doc, arrayUnion } from 'firebase/firestore/lite';
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

export const setComment = async (userID, movieID, content) => {
    const commentSnap = await getDoc(doc(commentsRef, movieID));
    const comments = commentSnap.data().comment;
    await setDoc(doc(commentsRef, movieID), {
        comment: [
            ...comments,
            {
                userID,
                content,
            },
        ],
    });
};
