const userResolver = require('./userResolver')
const postResolver = require('./postResolver')
const commentResolver = require('./commentResolver')

module.exports = {
    Query: {
        ...userResolver.Query,
        ...postResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation,
        ...postResolver.Mutation,
        ...commentResolver.Mutation
    }
}