import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Main from '../components/Main';
import Form from '../components/Form';
import { isSessionSet } from '../helper/Session';
import AuthContext from '../helper/Context';
import API from '../helper/ApiCall';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function Home() {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [totalIncomes, setTotalIncomes] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState([]);
    const [overallIncome, setOverallIncome] = useState(0);
    const [overallExpense, setOverallExpense] = useState(0);
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [monthlyExpense, setMonthlyExpense] = useState(0);
    const [displayDate, setDisplayDate] = useState({ year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1, date: (new Date()).getDate() });

    const changeDisplay = async (data) => {
        setDisplayDate({ year: Number(data.year), month: Number(data.month), date: Number(data.date) });

        setIncomes(totalIncomes.filter(elm => {
            return elm.date === `${data.year}, ${months[data.month - 1]} ${data.date}`
        }));

        setExpenses(totalExpenses.filter(elm => {
            return elm.date === `${data.year}, ${months[data.month - 1]} ${data.date}`
        }));

        setMonthlyIncome(totalIncomes.reduce((total, elm) => {
            return (new Date(elm.date)).getMonth() === Number(data.month - 1) ? total + elm.amount : total;
        }, 0));

        setMonthlyExpense(totalExpenses.reduce((total, elm) => {
            return (new Date(elm.date)).getMonth() === Number(data.month - 1) ? total + elm.amount : total;
        }, 0));
    }

    const deleteIncome = async (id, amount) => {
        incomes.shift();
        setIncomes(incomes);
        setOverallIncome(overallIncome - amount);
        const request = {
            query: `mutation { 
                deleteIncomeExpense(_id: "${id}") {
                    _id
                }
            }`
        };
        apiCall(request);
    }

    const deleteExpense = async (id, amount) => {
        expenses.shift();
        setExpenses(expenses);
        setOverallExpense(overallExpense - amount);
        const request = {
            query: `mutation { 
                deleteIncomeExpense(_id: "${id}") {
                    _id
                }
            }`
        };
        apiCall(request);
    }

    const addIncome = async (data) => {
        incomes.unshift(data);
        setIncomes(incomes);
        setOverallIncome(overallIncome + data.amount);
    }

    const addExpense = async (data) => {
        expenses.unshift(data);
        setExpenses(expenses);
        setOverallExpense(overallExpense + data.amount);
    }

    const apiCall = async (request, first = false) => {
        try {
            const res = await API(request);
            if (res.errors) {
                throw new Error(res.errors[0].message);
            } else {
                if (first) {
                    const date = new Date();
                    let localIncome = [];
                    let localExpense = [];
                    res.data.getIncomeExpense.forEach(elm => {
                        if (elm.type === 'expense') {
                            localExpense.push(elm);
                        } else {
                            localIncome.push(elm);
                        }
                    });
                    setTotalIncomes(localIncome);

                    setTotalExpenses(localExpense);

                    setIncomes(localIncome.filter(elm => {
                        return elm.date === `${date.getFullYear()}, ${months[date.getMonth()]} ${date.getDate()}`
                    }))

                    setExpenses(localExpense.filter(elm => {
                        return elm.date === `${date.getFullYear()}, ${months[date.getMonth()]} ${date.getDate()}`
                    }))

                    setOverallIncome(localIncome.reduce((total, elm) => {
                        return total + elm.amount;
                    }, 0));

                    setOverallExpense(localExpense.reduce((total, elm) => {
                        return total + elm.amount;
                    }, 0));

                    setMonthlyIncome(localIncome.reduce((total, elm) => {
                        return (new Date(elm.date)).getMonth() === date.getMonth() ? total + elm.amount : total;
                    }, 0));

                    setMonthlyExpense(localExpense.reduce((total, elm) => {
                        return (new Date(elm.date)).getMonth() === date.getMonth() ? total + elm.amount : total;
                    }, 0));
                }
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        if (!isSessionSet()) {
            navigate('/');
        } else {
            const request = {
                query: `query { 
                    getIncomeExpense {
                        amount, type, category, comment, date, time, dateTime, _id
                    }
                }`
            };
            apiCall(request, true);
        }
    }, [navigate]);

    return (
        <AuthContext.Provider value={{
            incomes: incomes,
            expenses: expenses,
            overallIncome: overallIncome,
            overallExpense: overallExpense,
            monthlyIncome: monthlyIncome,
            monthlyExpense: monthlyExpense,
            displayDate: displayDate,
            deleteIncome: deleteIncome,
            deleteExpense: deleteExpense,
            addIncome: addIncome,
            addExpense: addExpense,
            changeDisplay: changeDisplay
        }}>
            <Header setModal={setModal} />
            {
                modal
                    ?
                    <Form setModal={setModal} />
                    :
                    <Main />
            }
            <Footer />
        </AuthContext.Provider>
    )
}

export default Home