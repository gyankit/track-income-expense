const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type AuthData {
    _id: ID!
    token: String!
  }

  type IncomeExpense {
    _id: ID
    dateTime: String
    date: String
    time: String
    amount: Int
    type: String
    category: String
    comment: String
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  input IncomeExpenseInput {
    amount: Int!
    type: String!
    category: String!
    comment: String
  }

  
  type Query {
    getUser(email: String!, password: String!): AuthData!
    getIncomeExpense: [IncomeExpense]!
  }

  type Mutation {
    createUser(user: UserInput!): AuthData!
    updateUser(user: UserInput!): AuthData!
    deleteUser: Boolean!
    createIncomeExpense(incomeExpense: IncomeExpenseInput!): IncomeExpense!
    deleteIncomeExpense(_id: ID!): IncomeExpense!
  }
`);

module.exports = schema;
