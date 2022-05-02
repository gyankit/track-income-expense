const express = require('express');
const path = require('path');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./graphql/schema/index');
const resolver = require('./graphql/resolver/index');
const auth = require('./middleware/auth');
const cors = require('./middleware/cors');

let app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

process.env.NODE_ENV !== 'production' && app.use(cors);

app.use('/', express.static(path.join(__dirname, 'views/track-income-expense-0.1.0')));

app.use('/api', auth);

app.use('/api/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
}));

module.exports = app;
