const PostModel = require('../models/PostModel')

const postResolver = {
    getPosts: async () => {
        try {
            const posts = await PostModel.find()
            return posts
        } catch (error) {
            throw new Error(error)
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
        }
    }
}

module.exports = postResolver