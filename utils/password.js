const bcrypt = require('bcrypt')

module.exports.hashPassword = async (password) => {
    
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword
}

module.exports.comparePassword = async (loginPassword, dbPassword) => {

    // returns true or false
    const isMatch = await bcrypt.compare(loginPassword, dbPassword)

    return isMatch
}