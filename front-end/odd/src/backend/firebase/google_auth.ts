import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, signOut } from 'firebase/auth'
import { db, app } from './firebase_utils'
import { collection, setDoc, getDocs, getDoc, doc } from 'firebase/firestore';

const provider = new GoogleAuthProvider();
let name: string;
let email: string;
let token: string;
const googleLogin = async () => {
    try {
        const auth = getAuth(app);
        const res = await signInWithPopup(auth, provider);
        const user = res.user;
        if (user.displayName != null && user.email != null && await user.getIdToken() != null){
            name = user.displayName;
            email = user.email;
            token =  await user.getIdToken(true);
        }
        if ((await getDoc(doc(db, 'users/', token))).exists()){
            return [true, name];
        } else {
            setDoc(doc(db, 'users', token), {})
            return [true, name];
        }
    } catch (err){
        console.warn('Error w log in:', err);
        return [false, name];
    }
}

export { googleLogin }