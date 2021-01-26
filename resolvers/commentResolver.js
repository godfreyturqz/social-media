const { UserInputError, AuthenticationError } = require('apollo-server-express')
const PostModel = require('../models/PostModel')
const UserModel = require('../models/UserModel')
const { verifyJWT } = require('../utils/jwt')


module.exports.Mutation = {
    createComment: async (parent, args, context) => {
        const userID = verifyJWT(context)
        const { postID, comment } = args

        if(comment.trim() === '') throw new UserInputError('Empty comment')

        const post = await PostModel.findById(postID)
        if(!post) throw new UserInputError('Post not found')
        
        const { firstname, lastname } = await UserModel.findById(userID)

        post.comments.push({
            userID,
            comment,
            firstname,
            lastname,
            createdAt: new Date().toString()
        })
        await post.save()

        return post
    },
    deleteComment: async (parent, args, context) => {
        const userID = verifyJWT(context)
        const { postID, commentID } = args

        const post = await PostModel.findById(postID)
        if (!post) throw new UserInputError('Post not found')

        const commentIndex = post.comments.findIndex(comment => comment.id === commentID)
        if(post.comments[commentIndex].userID !== userID) throw new AuthenticationError('Action not allowed')
        
        post.comments.splice(commentIndex, 1)
        await post.save()
        
        return post
    }
}