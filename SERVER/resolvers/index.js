const PostModel = require('../models/PostModel')

const resolvers = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await PostModel.find()
                return posts
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

module.exports = resolvers