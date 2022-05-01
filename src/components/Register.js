import React, { useRef, useState } from 'react';
import API from '../helper/ApiCall';

function Register({ saveSession }) {

    const [notice, setNotice] = useState(undefined);
    const fullname = useRef(undefined);
    const email = useRef(undefined);
    const password1 = useRef(undefined);
    const password2 = useRef(undefined);

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password1.current.value !== password2.current.value) {
                throw new Error('Password Not Matching');
            }
            const request = {
                query: `mutation {
                        createUser(user: { name: "${fullname.current.value}", email: "${email.current.value}", password: "${password1.current.value}" 
                        }) {
                        _id, token
                    }
                }
            `};
            const res = await API(request);
            if (res.errors) {
                throw new Error(res.errors[0].message);
            } else {
                saveSession(res.data.createUser)
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
                    <label htmlFor="fullname">Full Name</label>
                    <input type="fullname" ref={fullname} required />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" ref={email} required />
                </div>
                <div className="form-control">
                    <label htmlFor="poassword1">Password</label>
                    <input type="password" ref={password1} />
                </div>
                <div className="form-control">
                    <label htmlFor="poassword2">Confirm Password</label>
                    <input type="text" ref={password2} />
                </div>
            </div>
            <div className="modal-footer">
                <button type='reset' className="btn btn-red"> Reset </button>
                <button type='submit' className='btn btn-blue'> Register </button>
            </div>
        </form>
    )
}

export default Register