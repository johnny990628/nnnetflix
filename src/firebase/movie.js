import { collection, getDoc, setDoc, updateDoc, doc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { db } from './db';

export const commentsRef = collection(db, 'comment');

export const getComments = async (movieID) => {
    try {
        const commentSnap = await getDoc(doc(commentsRef, movieID));
        if (commentSnap.data()) return commentSnap.data().comment;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const setComment = async (userID, movieID, content) => {
    const commentSnap = await getDoc(doc(commentsRef, movieID));
    let comments = [];
    if (commentSnap.data()) comments = commentSnap.data().comment;

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
