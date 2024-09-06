import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
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
        token = cred?.accessToken;
    }
    let dict: Dict = {
        email: email,
        name: name,
        token: token
    }
    return dict;
})

async function verifAuth(email: string, name: string, token: string){
    try {
        const docs = await getDocs(collection(db, 'users'));
        let exists = false;
        docs.forEach((doc) => {
            console.log(doc);
            const id = name;
            if (doc.id == id){
                exists = true;
                return {email: email, user: name, token: token}
            } 
        })
        if (exists) {
            return token;
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
    
        return {email: email, user: name, token: token}
    
    } catch (e){
        throw e;
    }

}

const authExport = async () => {
    const ac = await authCheck;
    return verifAuth(ac.email, ac.name, ac.token);
}

export {authExport}