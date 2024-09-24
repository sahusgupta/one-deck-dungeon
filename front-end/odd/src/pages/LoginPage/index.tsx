import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogin } from '../../backend/firebase/google_auth';
import { FcGoogle } from 'react-icons/fc';
import { FaUserCircle } from 'react-icons/fa';
import PageLayout from '../../components/PageLayout';
import { response } from 'express';

function LoginPage() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({ email: '', token: '', user: '' });

    const responseMessage = (response: any) => {
        console.log(response);
        navigate('/homepage');
    };

    const errorMessage = (error: string) => {
        console.log(error);
    };
    useEffect(() => {
        if (localStorage.getItem('login') == 'true') {
            responseMessage('already logged in');
        }
    })
    return (
        <PageLayout>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-center mb-4">
                    <FaUserCircle size="3em" className="text-gray-500" />
                </div>
                <h2 className="text-2xl font-bold text-center text-black mb-6">Sign In</h2>
                <button
                    className="w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={async () => {
                        let success = await googleLogin();
                        if (success.login) {
                            localStorage.setItem('credentials', success.token);
                            responseMessage(null);
                        } else {
                            console.log('Failed to log in');
                        }
                    }}
                >
                    <FcGoogle size="1.5em" className="mr-2" />
                    Login with Google
                </button>
            </div>
        </div>
        </PageLayout>
    );
}

export default LoginPage;
