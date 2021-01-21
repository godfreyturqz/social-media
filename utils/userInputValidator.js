const validator = require('validator')

module.exports.userInputValidator = (email, password, confirmPassword) => {

    const errors = {}

    if(email.trim() === ''){
        errors.email = 'Enter an email'
    } else {
        if (validator.isEmail(email) === false) {
            errors.email = 'Enter a valid email'
        }
    }

    if(password === '' && confirmPassword === null) {
        errors.password = 'Enter a password'
    } 
    if(password !== confirmPassword && confirmPassword !== null) {
        errors.confirmPassword = 'Password does not match'
    }

    return errors
}
