import React, { useState, useContext } from 'react';
import AuthContext from '../helper/Context';
import List from './List';

function Expense() {
	const date = new Date();
	const context = useContext(AuthContext);
	const [collapse, setCollapse] = useState(true);

	return (
		<div className='card'>
			<div className='card-header'>
				<div>
					<h2>Expense - <span className='red'>Rs. {context.monthlyExpense}</span></h2>
				</div>
				{
					context.expenses.length !== 0 &&
					<div className='btn-space'>
						{
							context.displayDate.year === date.getFullYear() && context.displayDate.month - 1 === date.getMonth() && context.displayDate.date === date.getDate() &&
							<button className='btn-hidden red' onClick={() => context.deleteExpense(context.expenses[0]._id, context.expenses[0].amount)}>
								<i className='icon-ui-delete icon-md'></i>
							</button>
						}
						<button className="btn-hidden blue" type="button" onClick={() => setCollapse(!collapse)}>
							{
								collapse
									?
									<i className='icon-arrow-down icon-lg'></i>
									:
									<i className='icon-arrow-right icon-lg'></i>
							}
						</button>
					</div>
				}
			</div>
			<div className={collapse ? "card-body" : "card-body collapse"} id="collapseExpense">
				{
					context.expenses.map((elm, key) => {
						return <List
							key={key}
							data={elm}
							type={false} />
					})
				}
			</div>
		</div >
	)
}

export default Expense