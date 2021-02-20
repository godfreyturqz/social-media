const { AuthenticationError, UserInputError } = require('apollo-server-express')
const PostModel = require('../models/PostModel')
const UserModel = require('../models/UserModel')
const { verifyJWT }= require('../utils/jwt')


module.exports.Query = {
    getPosts: async () => {
        const posts = await PostModel.find().sort({createdAt: -1})
        return posts
    },
    getPost: async (parent, args) => {
        const { postID }= args
        const post = await PostModel.findById(postID)
        return post
    }
}

module.exports.Mutation = {
    createPost: async (parent, args, context) => {
        const userID = verifyJWT(context)
        const { post } = args
        
        if(post.trim() === '') throw new UserInputError('Empty post')

        const { firstname, lastname } = await UserModel.findById(userID)

        const newPost = await PostModel.create({
            userID,
            post,
            createdAt: new Date().toString(),
            firstname,
            lastname
        })

        return {
            id: newPost._id,
            ...newPost._doc
        }
    },
    deletePost: async (parent, args, context) => {
        const userID = verifyJWT(context)
        const { postID } = args

        const post = await PostModel.findById(postID)
        if(userID !== post.userID) throw new AuthenticationError('Action not allowed')
        
        const deletedPost = await PostModel.findByIdAndRemove(postID)

        return deletedPost
    },
    likePost: async (parent, args, context) => {
        const userID = verifyJWT(context)
        const { postID } = args

        const post = await PostModel.findById(postID)
        if(!post) throw new UserInputError('Post not found')

        const isLiked = post.likes.find(like => like.userID === userID)
        if (isLiked) {
            post.likes = post.likes.filter(like => like.userID !== userID)
        } else {
            const { firstname, lastname } = await UserModel.findById(userID)
            post.likes.push({
                userID,
                firstname,
                lastname,
                createdAt: new Date().toString()
            })
        }

        await post.save()

        return post
    }
}