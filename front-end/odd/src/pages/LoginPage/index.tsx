import React, { useState, useEffect } from 'react';
import { googleLogout, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
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
            <GoogleLogin onSuccess={responseMessage} />
        </div>
    )
}
export default LoginPage;