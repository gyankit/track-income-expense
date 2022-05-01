const mongoose = require('mongoose');

const IncomeExpencesSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    comment: { type: String }
}, { timestamps: true }, { strict: false });

const IncomeExpenseModel = (userId) => {
    return mongoose.model(userId, IncomeExpencesSchema)
};

module.exports = IncomeExpenseModel;