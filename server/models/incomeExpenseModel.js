const mongoose = require('mongoose');

const IncomeExpencesSchema = new mongoose.Schema({
    dateTime: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    comment: { type: String }
}, { strict: false });

const IncomeExpenseModel = (userId) => {
    return mongoose.model(userId, IncomeExpencesSchema)
};

module.exports = IncomeExpenseModel;