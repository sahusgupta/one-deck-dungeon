import React, { useState, useEffect } from 'react';
import { googleLogout, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { signInFlow, Dict } from '../../backend/firebase/google_auth';
let a = null;

function LoginPage() {
    const navigate = useNavigate();
    let [auth, setAuth] = useState({email: '', token: '', user: ''});
    const updateAuth = (email: string, token: string, user: string) => {
        setAuth({email: email, token: token, user: user})
    }
    const responseMessage = (response: any) => {
        console.log(response);
        navigate('/homepage')
    };
    const errorMessage = (error: string) => {
        console.log(error);
    };
    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            <button onClick={async () => {
                console.log('hi')
                let auth = await signInFlow();
                
                if (auth != null){
                    a = auth;
                    console.log(auth)
                    updateAuth(auth.email, auth.name, auth.token);
                } else {
                    navigate('/') 
                }

            }}/>
        </div>
    )
}
export default LoginPage;
export {a};