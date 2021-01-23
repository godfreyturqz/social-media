const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server-express')

module.exports.checkAuth = (context) => {
    const authHeader = context.req.headers.authorization
    if(!authHeader) throw new Error('Authorization Header error')

    const token = authHeader.split('Bearer ')[1]
    if(!token) throw new Error('Bearer Token error')

    try {
        const user = jwt.verify(token, process.env.JWT)
        return user
    } catch (error) {
        throw new AuthenticationError('Invalid/Expired token')
    }
}