const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    email: String,
    password: String,
    createdAt: String
})

module.exports = model('users', userSchema)