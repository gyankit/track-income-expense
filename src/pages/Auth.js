import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import { isSessionSet, setSession } from '../helper/Session';

function Auth() {
    const navigate = useNavigate();
    const [login, setLogin] = useState(true);

    const saveSession = (data) => {
        setSession(data);
        navigate('/home');
    }

    useEffect(() => {
        if (isSessionSet()) {
            navigate('/home');
        }
    }, [navigate]);

    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <strong>{login ? 'Login' : 'Register'}</strong>
                </div>
                {login ? <Login saveSession={(data) => saveSession(data)} /> : <Register saveSession={(data) => saveSession(data)} />}
                <div className='switch'>
                    <span onClick={() => setLogin(!login)}>{login ? 'Create New Account' : 'Login'} &#8594; </span>
                </div>
            </div>
        </div>
    )
}

export default Auth