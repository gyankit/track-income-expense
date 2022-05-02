const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserModel = require('../../models/userModel');
const IncomeExpenseModel = require('../../models/incomeExpenseModel');
const { singleResponse } = require('../../middleware/response');

module.exports = {
    createUser: async (args, req) => {
        try {
            if (req.isAuth) throw new Error(400);
            const hashPassword = await bcrypt.hash(args.user.password, 12);
            const user = new UserModel({
                name: args.user.name,
                email: args.user.email,
                password: hashPassword,
            });
            const result = await user.save();
            const tokenData = {
                _id: result.id,
                name: result.name,
                email: result.email,
                dateTime: new Date().toISOString()
            }
            const token = jwt.sign({ data: tokenData }, 'specialsecretkey');
            const response = { "_id": result.id, "token": token };
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    updateUser: (args, req) => {
        try {
            if (!req.isAuth) throw new Error(400);
            return;
        }
        catch (error) {
            throw error;
        }
    },

    deleteUser: (args, req) => {
        try {
            if (!req.isAuth) throw new Error(400);
            return;
        }
        catch (error) {
            throw error;
        }
    },

    createIncomeExpense: async (args, req) => {
        try {
            console.log(args)
            if (!req.isAuth) throw new Error(400);
            const IncomeExpense = IncomeExpenseModel(req._id);
            const incomeExpense = new IncomeExpense({
                dateTime: args.incomeExpense.dateTime,
                amount: args.incomeExpense.amount,
                type: args.incomeExpense.type,
                category: args.incomeExpense.category,
                comment: args.incomeExpense.comment,
            });
            const result = await incomeExpense.save();
            return singleResponse(result);
        }
        catch (error) {
            throw error;
        }
    },

    deleteIncomeExpense: async (args, req) => {
        try {
            if (!req.isAuth) throw new Error(400);
            const IncomeExpense = IncomeExpenseModel(req._id);
            const data = await IncomeExpense.findByIdAndDelete(args._id);
            return singleResponse(data);
        }
        catch (error) {
            throw error;
        }
    }
};