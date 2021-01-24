const { UserInputError, AuthenticationError } = require('apollo-server-express')
const PostModel = require('../models/PostModel')
const { checkAuth } = require('../utils/checkAuth')

module.exports = {
    Mutation: {
    }
}