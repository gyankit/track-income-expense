const queryResolver = require('./query');
const mutationResolver = require('./mutation');

const resolver = {
    ...queryResolver,
    ...mutationResolver
};

module.exports = resolver;

