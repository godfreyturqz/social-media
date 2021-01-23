const { UserInputError } = require('apollo-server-express')
// RELATIVE FILES
const UserModel = require('../models/UserModel')
const { userInputValidator } = require('../utils/userInputValidator')
const { hashPassword, comparePassword } = require('../utils/password')
const { createJWT } = require('../utils/createJWT')


module.exports = {
    Mutation: {
        register: async (parent, args) => {
            const { registerInput: { email, password, confirmPassword } } = args
    
            const errors = userInputValidator(email, password, confirmPassword)
            if(Object.keys(errors).length >= 1) throw new UserInputError('User input validation error', { errors })
    
            const isEmailExists = await UserModel.findOne({email})
            if(isEmailExists) throw new UserInputError('Account already exists')
    
            const hashedPassword = await hashPassword(password)
    
            const newUser = await UserModel.create({
                email,
                password: hashedPassword,
                createdAt: new Date().toString()
            })
    
            const token = createJWT(newUser._id)

            return {
                id: newUser._id,
                email: newUser.email,
                createdAt: newUser.createdAt,
                token
            }
        },
        login: async (parent, args) => {
            const { loginInput: { email, password } } = args
    
            const errors = userInputValidator(email, password, null)
            if(Object.keys(errors).length >= 1) throw new UserInputError('User input validation error', { errors })
    
            const userData = await UserModel.findOne({email})
            if(userData === null) throw new UserInputError('Account does not exists')
    
            const isMatch = await comparePassword(password, userData.password)
            if(!isMatch) throw Error('Some of your information isn\'t correct. Please try again')

            const token = createJWT(userData._id)

            return {
                id: userData._id,
                email: userData.email,
                createdAt: userData.createdAt,
                token
            }
        }
    }
}