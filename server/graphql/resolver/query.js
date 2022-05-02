const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserModel = require('../../models/userModel');
const IncomeExpenseModel = require('../../models/incomeExpenseModel');
const { multiResponse } = require('../../middleware/response');

module.exports = {
    getUser: async (args, req) => {
        try {
            if (req.isAuth) throw new Error('Already LoggedIn');
            const user = await UserModel.findOne({ email: args.email, active: true });
            if (!user) {
                throw new Error('Wrong Email');
            }
            const isPasswordMatch = await bcrypt.compare(args.password, user.password);
            if (!isPasswordMatch) {
                throw new Error('Wrong Password');
            }
            const tokenData = {
                _id: user.id,
                name: user.name,
                email: user.email,
                dateTime: new Date().toISOString()
            }
            const token = jwt.sign({ data: tokenData }, 'specialsecretkey');
            const response = { "_id": user.id, "token": token };
            return response;
        }
        catch (error) {
            throw error;
        }
    },

    getIncomeExpense: async (args, req) => {
        try {
            if (!req.isAuth) throw new Error(400);
            const IncomeExpense = IncomeExpenseModel(req._id);
            const data = await IncomeExpense.find({}).sort({ createdAt: -1 });
            return multiResponse(data);
        }
        catch (error) {
            throw error;
        }
    }
};
