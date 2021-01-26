const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server-express')


const createJWT = (userID) => {

    const token = jwt.sign({ userID }, process.env.JWT, { expiresIn: '1h' })

    return token
}

const verifyJWT = (context) => {
    
    const authHeader = context.req.headers.authorization
    if(!authHeader) throw new AuthenticationError('Authorization Header error')

    const token = authHeader.split('Bearer ')[1]
    if(!token) throw new AuthenticationError('Bearer Token error')

    const { userID, iat, exp } = jwt.verify(token, process.env.JWT)
    if(!userID) throw new AuthenticationError('Invalid/Expired token')

    return userID
}

module.exports = { createJWT, verifyJWT }