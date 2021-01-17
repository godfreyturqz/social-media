const postResolver = require('./postResolver')
const userResolver = require('./userResolver')

const resolvers = {
    Query: {
        ...postResolver
    },
    Mutation: {
        ...userResolver
    }
}

module.exports = resolvers