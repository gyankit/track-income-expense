const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./graphql/schema/index');
const resolver = require('./graphql/resolver/index');
const Auth = require('./middleware/auth');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Headers", "content-type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use('/', Auth);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
}));

module.exports = app;
