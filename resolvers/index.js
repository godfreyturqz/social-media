const postResolver = require('./postResolver')
const userResolver = require('./userResolver')

module.exports = {
    Query: {
        ...postResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation,
        ...postResolver.Mutation
    }
}