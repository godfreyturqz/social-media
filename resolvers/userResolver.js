const { UserInputError, AuthenticationError } = require('apollo-server-express')
const UserModel = require('../models/UserModel')
// utils
const { regInputValidator, loginInputValidator } = require('../utils/inputValidator')
const { createJWT } = require('../utils/jwt')
const { hashPassword, comparePassword } = require('../utils/password')


module.exports.Query = {
    getUsers: async () => {
        const users = await UserModel.find().sort({createdAt: 1})
        return users
    }
}

module.exports.Mutation = {
    register: async (parent, args) => {
        const {registerInput: { firstname, lastname, email, password, confirmPassword }} = args

        const errors = regInputValidator(firstname, lastname, email, password, confirmPassword)
        if(Object.keys(errors).length >= 1) throw new UserInputError('UserInputError', { errors })

        const isEmailExists = await UserModel.findOne({email})
        if(isEmailExists) throw new UserInputError('UserInputError',{errors: 'Account already exists'})

        const hashedPassword = await hashPassword(password)

        const newUser = await UserModel.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            createdAt: new Date().toString()
        })

        const token = createJWT(newUser._id)

        return {
            id: newUser._id,
            ...newUser._doc,
            token
        }
    },
    login: async (parent, args) => {
        const {loginInput: { email, password }} = args

        const errors = loginInputValidator(email, password)
        if(Object.keys(errors).length >= 1) throw new UserInputError('UserInputError', { errors })

        const userData = await UserModel.findOne({email})
        if(userData === null) throw new UserInputError('UserInputError', {errors: 'Account does not exists'})

        const isMatch = await comparePassword(password, userData.password)
        if(isMatch === false) throw new AuthenticationError('AuthenticationError', {errors: 'Some of your information isn\'t correct. Please try again'})

        const token = createJWT(userData._id)

        return { 
            id: userData._id,
            ...userData._doc,
            token
        }
    }
}