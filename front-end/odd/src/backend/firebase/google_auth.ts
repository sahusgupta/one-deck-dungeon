import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { db, app } from './firebase_utils'

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const auth = getAuth(app);
auth.useDeviceLanguage();
let email = signInWithPopup(auth, provider).then((result) => {
    const cred = GoogleAuthProvider.credentialFromResult(result);
    const token = cred?.accessToken;
    const user = result.user;
    return user.email;
})
