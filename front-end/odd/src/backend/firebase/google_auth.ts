import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'
import { db, app } from './firebase_utils'
import { collection, setDoc, getDocs, getDoc, doc } from 'firebase/firestore';

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const auth = getAuth(app);
auth.useDeviceLanguage();

interface Dict {
    email: string,
    name: string,
    token: string
}

let authCheck = signInWithPopup(auth, provider).then((result) => {
    const cred = GoogleAuthProvider.credentialFromResult(result);
    let token = '';
    const user = result.user;
    let email = '';
    let name = '';
    if (user.email){
        email = user.email
    }
    if (user.displayName){
        name = user.displayName;    
    }
    if (cred?.accessToken){
        token = cred.accessToken;
    }
    let dict: Dict = {
        email: email,
        name: name,
        token: token
    }
    return dict;
}).catch((error) => {
    if (error.message.includes('Cross-Origin-Opener-Policy')) {
        // Fall back to redirect method or another sign-in approach
        return signInWithRedirect(auth, provider);
      }
})

async function verifAuth(email: string, name: string, token: string){
    try {
        const docs = await getDocs(collection(db, 'users'));
        let exists = false;
        docs.forEach((doc) => {
            console.log(name);
            const id = name;
            if (doc.id == id){
                exists = true;
                let dict: Dict = {
                    email: email,
                    name: name,
                    token: token
                }
                console.log('exists')
                return dict;
            } 
        })
        if (exists) {
            let dict: Dict = {
                email: email,
                name: name,
                token: token
            }
            return dict;
        } else {
            let n = "";
            if (name != null){
                n = name;
            }
            setDoc(doc(db, 'users', n), {
                email: email,
                user: name,
                token: token
            })
        }
        let dict: Dict = {
            email: email,
            name: name,
            token: token
        }
        return dict;
        
    } catch (e){
        console.log('something went wrong')
        throw e;
    }
    
}

const authExport = async () => {
    const ac = await authCheck;
    if (ac)
        return verifAuth(ac.email, ac.name, ac.token);
    else {
        let dict: Dict = {
            name: '',
            email: '',
            token: ''

        }
        return dict
    }
}


async function signInFlow () {
    const auth = await authExport();
    console.log('sign in worked?')
    return auth;
}
export {signInFlow}
export type { Dict };