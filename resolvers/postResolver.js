const { AuthenticationError, UserInputError } = require('apollo-server-express')
const PostModel = require('../models/PostModel')
const { checkAuth }= require('../utils/checkAuth')


module.exports = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await PostModel.find().sort({createdAt: -1})
                return posts
            } catch (error) {
                throw new Error(error)
            }
        },
        getPost: async (parent, args) => {
            try {
                const { postId }= args
                const post = await PostModel.findById(postId)
                return post
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        createPost: async (parent, args, context) => {
            const user = checkAuth(context)
            const { body } = args
            const newPost = await PostModel.create({
                body,
                user: user.id,
                createdAt: new Date().toString()
            })
            return newPost
        },
        deletePost: async (parent, args, context) => {
            const user = checkAuth(context)
            const { postId } = args
            try {
                const post = await PostModel.findById(postId).populate('users').then((res) => console.log(res))
                if(user.email === post.email){
                    const deletedPost = await PostModel.findByIdAndRemove(postId)
                    return deletedPost
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } catch (error) {
                throw new Error(error)
            }
        },
        likePost: async (parent, args, context) => {
            const user = checkAuth(context)
            const { postId } = args

            const post = await PostModel.findById(postId)
            if(!post) throw new UserInputError('Post not found')

            if (post.likes.find(like => like.username === user.username)) {
                post.likes = post.likes.filter(like => like.username === user.username)
            } else {
                post.likes.push({
                    username: user.username,
                    createdAt: new Date().toString()
                })
            }

            await post.save()

            return post
        }
    }
}