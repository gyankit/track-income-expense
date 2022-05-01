import React from 'react';
import NavBar from './NavBar';
import Expense from './Expense';
import Income from './Income'

function Main() {
    return (
        <React.Fragment>
            <NavBar />
            <Income />
            <Expense />
        </React.Fragment>
    )
}

export default Main