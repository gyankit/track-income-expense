import React, { useRef, useReducer, useState, useContext } from 'react';
import API from '../helper/ApiCall';
import AuthContext from '../helper/Context';

function Form({ setModal }) {

    const context = useContext(AuthContext);
    const [notice, setNotice] = useState(undefined);
    const [type, dispatch] = useReducer(reducer, 'expense');
    const amount = useRef(0);
    const category = useRef(undefined);
    const remark = useRef(undefined);

    function reducer(type, action) {
        if (action === 'income')
            type = 'income';
        else
            type = 'expense';
        return type;
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const request = {
                query: `mutation {
                    createIncomeExpense(incomeExpense: { amount: ${amount.current.value}, category: "${category.current.value}", comment: "${remark.current.value}", type: "${type}"
                        }) {
                        amount, type, category, comment, date, time, dateTime, _id
                    }
                }
            `};
            const res = await API(request);
            if (res.errors) {
                throw new Error(res.errors[0].message);
            } else {
                if (type === 'income')
                    context.addIncome(res.data.createIncomeExpense)
                else
                    context.addExpense(res.data.createIncomeExpense)
                setModal(false);
            }
        } catch (error) {
            setNotice(error.message);
        }
    }

    return (
        <div className="modal">
            <div className="modal-content" >
                <div className="modal-close-btn">
                    <button onClick={() => setModal(false)}>
                        <span>&times;</span>
                    </button>
                </div>
                <div className='error'>{notice}</div>
                <form onSubmit={formSubmit}>
                    <div className="modal-body">
                        <div className="radio-selector">
                            <div className="radio-selector-item">
                                <input type="radio" id="income" name="type" className="selector-item_radio" onChange={() => dispatch('income')} />
                                <label htmlFor="income" className="selector-item_label"> Income </label>
                            </div>
                            <div className="radio-selector-item">
                                <input type="radio" id="expense" name="type" className="selector-item_radio" defaultChecked onChange={() => dispatch('expense')} />
                                <label htmlFor="expense" className="selector-item_label"> Expense </label>
                            </div>
                        </div>
                        <div className="form-control">
                            <label htmlFor="amount">Date</label>
                            <input type="text" value={new Date().toISOString()} readOnly />
                        </div>
                        <div className="form-control">
                            <label htmlFor="amount">Amount</label>
                            <input type="number" id="amount" ref={amount} required />
                        </div>
                        <div className="form-control">
                            <label htmlFor="category" >Category</label>
                            <select aria-label="Default select category" ref={category} required>
                                <option value="Personal">Personal</option>
                                <option value="Rent">Rent</option>
                                <option value="Food">Food</option>
                                <option value="Drink">Drink</option>
                                <option value="Shoping">Shoping</option>
                                <option value="Travel">Travel</option>
                                <option value="Bill Payment">Bill Payment</option>
                                <option value="Investment">Investment</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label htmlFor="remark">Remark / Comment</label>
                            <input type="text" id="remark" ref={remark} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type='reset' onClick={() => setModal(false)} className="btn btn-red">
                            Cancel
                        </button>
                        <button type='submit' className='btn btn-blue'>Save</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Form