const postResolver = require('./postResolver')

const resolvers = {
    Query: {
        ...postResolver
    }
}

module.exports = resolvers