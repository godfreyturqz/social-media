const PostModel = require('../models/PostModel')

const postResolver = {
    getPosts: async () => {
        try {
            const posts = await PostModel.find()
            return posts
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = postResolver