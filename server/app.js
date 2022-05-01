const express = require('express');
const path = require('path');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./graphql/schema/index');
const resolver = require('./graphql/resolver/index');
const auth = require('./middleware/auth');

let app = express();

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Headers", "content-type, Accept, Authorization");
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     return next();
// });

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'views/track-income-expense-0.1.0')));

app.use('/api', auth);

app.use('/api/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
}));

module.exports = app;
