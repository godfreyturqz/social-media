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
    },
    login: async (parent, args) => {
        const { loginInput: { email, password } } = args

        const errors = userInputValidator(email, password, null)
        if(Object.keys(errors).length >= 1) throw new UserInputError('User input validation error', { errors })

        const userData = await UserModel.findOne({email})
        if(userData === null) throw new UserInputError('Account does not exists')

        const isMatch = await comparePassword(password, userData.password)
        if(isMatch){
            const token = createJWT(userData._id)
            return {
                id: userData._id,
                email: userData.email,
                createdAt: userData.createdAt,
                token
            }
        } else {
            throw Error('Some of your information isn\'t correct. Please try again') 
        }
    }
}

module.exports = userResolver