const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    createdAt: String
})

module.exports = model('user', userSchema)