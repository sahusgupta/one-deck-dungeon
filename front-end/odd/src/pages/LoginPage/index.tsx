import React, { useState, useEffect } from 'react';
import { googleLogout, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { googleLogin, Dict } from '../../backend/firebase/google_auth';

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
                let success = await googleLogin()
                if (success.login){
                    localStorage.setItem('credentials', success.token)
                    responseMessage(null);
                } else {
                    console.log('failed to log in')
                }
            }}>Login with Google</button>
        </div>
    )
}
export default LoginPage;
