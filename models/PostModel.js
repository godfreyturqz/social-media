const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    userID: String,
    post: String,
    createdAt: String,
    firstname: String,
    lastname: String,
    comments: [
        {
            userID: String,
            comment: String,
            firstname: String,
            lastname: String,
            createdAt: String
        }
    ],
    likes: [
        {
            userID: String,
            firstname: String,
            lastname: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = model('post', postSchema)