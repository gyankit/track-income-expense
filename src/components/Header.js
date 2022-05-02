import React from 'react';
import { useNavigate } from 'react-router-dom';
import { unSetSession } from '../helper/Session';

function Header({ setModal }) {
    const navigate = useNavigate();

    const logout = () => {
        unSetSession();
        navigate('/');
    }

    return (
        <header className='header'>
            <div className="header-title">
                <h2>Track Income Expense</h2>
            </div>
            <div className='btn-space header-btn'>
                <button type='button' className='btn-hidden blue' onClick={() => setModal(true)}>
                    <i className='icon-ui-add'></i>
                </button>

                <button type='button' className='btn-hidden red' onClick={() => logout()}>
                    <i className='icon-logout icon-md'></i>
                </button>
            </div>
        </header>
    )
}

export default Header