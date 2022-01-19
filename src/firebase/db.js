import { getFirestore } from 'firebase/firestore/lite';
import { app } from './firebase.js';

export const db = getFirestore(app);
