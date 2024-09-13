import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, signOut } from 'firebase/auth'
import { db, app } from './firebase_utils'
import { collection, setDoc, getDocs, getDoc, doc } from 'firebase/firestore';

const provider = new GoogleAuthProvider();

interface Dict {
    name: string,
    email: string,
    token: string,
    imageURL: string,
    login: boolean
}
const googleLogin = async () => {
    let creds: Dict = {name: '', email: '', token: '', imageURL: '', login: false}
    try {
        const auth = getAuth(app);
        const res = await signInWithPopup(auth, provider);
        const user = res.user;
        if (user.displayName != null && user.email != null && await user.getIdToken() != null){
            creds.name = user.displayName;
            creds.email = user.email;
            creds.token =  user.uid;
            creds.imageURL = user.photoURL ? user.photoURL : '';
        }
        if ((await getDoc(doc(db, 'users', creds.token))).exists()){
            creds.login = true
            return creds;
        } else {
            setDoc(doc(db, 'users', creds.token), {name: creds.name, email: creds.email, imageURL: creds.imageURL, gamesPlayed: 0, checks: 0, Campaign: ""})
            creds.login = true
            return creds;
        }
    } catch (err){
        creds.login = false;
        console.warn('Error w log in:', err);
        return creds;
    }
}

export { googleLogin, type Dict };