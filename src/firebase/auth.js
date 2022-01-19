import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { setUser } from './user';

const provider = new GoogleAuthProvider();

export const auth = getAuth();
export const SignInWithGoogle = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await signInWithPopup(auth, provider);
            if (user) {
                setUser(user.user);
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
