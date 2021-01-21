const jwt = require('jsonwebtoken')

module.exports.createJWT = (userId) => {

    const token = jwt.sign(
        { userId },
        process.env.JWT,
        { expiresIn: '1h' }
    )

    return token
} 