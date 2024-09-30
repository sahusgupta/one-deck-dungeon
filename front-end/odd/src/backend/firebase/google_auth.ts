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
        if (localStorage.getItem('login') == 'true'){
            creds.name = localStorage.getItem('userdata') as string;
            creds.token = localStorage.getItem('credentials') as string;
            creds.imageURL = localStorage.getItem('imageURL') as string;
            creds.login = localStorage.getItem('login') == 'true'
            creds.email = localStorage.getItem('email') as string;
            return creds;
        }
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
            localStorage.setItem('login', 'true')
            return creds;
        } else {
            setDoc(doc(db, 'users', creds.token), {name: creds.name, email: creds.email, imageURL: creds.imageURL, gamesPlayed: 0, checks: 0, heroes: []})
            creds.login = true
            localStorage.setItem('login', 'true')
            return creds;
        }
    } catch (err){
        creds.login = false;
        console.warn('Error w log in:', err);
        return creds;
    }
}
async function logout(){
    if (localStorage.getItem('login') == 'true'){
        localStorage.clear()
    }
}
export { googleLogin, type Dict, logout };