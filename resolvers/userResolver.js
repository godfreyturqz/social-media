const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// RELATIVE FILES
const UserModel = require('../models/UserModel')

const userResolver = {
    register: async (parent, args) => {
        const {registerInput: { email, password, confirmPassword }} = args

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await UserModel.create({
            email,
            password: hashedPassword,
            createdAt: new Date().toString()
        })

        const token = jwt.sign({id: newUser._id}, process.env.JWT, {expiresIn: '1h'})

        return {
            id: newUser._id,
            email: newUser.email,
            createdAt: newUser.createdAt,
            token
        }
    }
}

module.exports = userResolver