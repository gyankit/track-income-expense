import React, { useState, useContext } from 'react';
import AuthContext from '../helper/Context';
import List from './List';

function Income() {
    const date = new Date();
    const context = useContext(AuthContext);
    const [collapse, setCollapse] = useState(false);

    return (
        <div className='card'>
            <div className='card-header'>
                <div>
                    <h2>Income - <span className='green'>Rs. {context.monthlyIncome}</span></h2>
                </div>
                {
                    context.incomes.length !== 0 &&
                    <div className='btn-space'>
                        {
                            context.displayDate.year === date.getFullYear() && context.displayDate.month - 1 === date.getMonth() && context.displayDate.date === date.getDate() &&
                            <button className='btn-hidden red' onClick={() => context.deleteIncome(context.incomes[0]._id, context.incomes[0].amount)}>
                                <i className='icon-ui-delete icon-md'></i>
                            </button>
                        }
                        <button className="btn-hidden blue" type="button" onClick={() => setCollapse(
                            !collapse)}>
                            {
                                collapse
                                    ?
                                    <i className='icon-arrow-down icon-lg'></i>
                                    :
                                    <i className='icon-arrow-right icon-lg'></i>
                            }</button>
                    </div>
                }
            </div>
            <div className={collapse ? "card-body" : "card-body collapse"} id="collapseIncome">
                {
                    context.incomes.map((elm, key) => {
                        return <List
                            key={key}
                            data={elm}
                            type={true} />
                    })
                }
            </div>
        </div>
    )
}

export default Income