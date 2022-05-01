import React from 'react';

export default React.createContext({
    incomes: [{
        id: String,
        date: String,
        time: String,
        category: String,
        comment: String,
        amount: Number,
    }],
    expenses: [{
        id: String,
        date: String,
        time: String,
        category: String,
        comment: String,
        amount: Number,
    }],
    displayDate: {
        year: Number,
        month: Number,
        date: Number
    },
    overallIncome: Number,
    overallExpense: Number,
    monthlyIncome: Number,
    monthlyExpense: Number,
    deleteIncome: (id, amount) => { },
    deleteExpense: (id, amount) => { },
    addIncome: (data) => { },
    addExpense: (data) => { },
    changeDisplay: (date) => { }
});
