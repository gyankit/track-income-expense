import React, { useRef, useState } from 'react';
import API from '../helper/ApiCall';

function Login({ saveSession }) {

    const [notice, setNotice] = useState(undefined);
    const email = useRef(undefined);
    const password = useRef(undefined);

    const formSubmit = async (e) => {
        e.preventDefault();
        const request = {
            query: `query { 
                getUser ( email: "${email.current.value}", password: "${password.current.value}") {
                    _id, token
                }
            }`
        };
        try {
            const res = await API(request);
            if (res.errors) {
                throw new Error(res.errors[0].message);
            } else {
                saveSession(res.data.getUser);
            }
        } catch (error) {
            setNotice(error.message);
        }
    }

    return (
        <form onSubmit={formSubmit}>
            <div className="modal-body">
                <div className='error'>{notice}</div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" ref={email} required />
                </div>
                <div className="form-control">
                    <label htmlFor="poassword">Password</label>
                    <input type="password" ref={password} />
                </div>
            </div>
            <div className="modal-footer">
                <button type='reset' className="btn btn-red"> Reset </button>
                <button type='submit' className='btn btn-blue'> Login </button>
            </div>
        </form>
    )
}

export default Login