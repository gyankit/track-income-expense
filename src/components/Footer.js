import React, { useContext } from 'react';
import AuthContext from '../helper/Context';

function Footer() {
    const context = useContext(AuthContext);
    return (
        <footer className='footer'>
            <div className='footer-content'>
                <h4>Total Incomes</h4>
                <strong className='green'>Rs. {context.overallIncome}</strong>
            </div>
            <div className='footer-content'>
                <h4>Total Expenses</h4>
                <strong className='red'>Rs. {context.overallExpense}</strong>
            </div>
        </footer>
    )
}

export default Footer