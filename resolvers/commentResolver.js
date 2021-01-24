const { UserInputError, AuthenticationError } = require('apollo-server-express')
const PostModel = require('../models/PostModel')
const { checkAuth } = require('../utils/checkAuth')

module.exports = {
    Mutation: {
        createComment: async (parent, args, context) => {
            const { postId, body } = args
            const user = checkAuth(context)

            if(body.trim() === '') throw new UserInputError('Empty comment')

            const post = await PostModel.findById(postId)
            if(!post) throw new UserInputError('Post not found')
            
            post.comments.unshift({
                body,
                username: user.username,
                createdAt: new Date().toString()
            })
            await post.save()

            return post
        },
    }
}