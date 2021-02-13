const validator = require('validator')


const errorEmptyField = 'Fill-up empty field'
const errorInvalidEmail = 'Enter a valid email'
const errorPasswordMismatch = 'Password does not match'

const regInputValidator = (firstname, lastname, email, password, confirmPassword) => {

    const errors = {}

    if(firstname.trim() === ''){
        errors.firstname = errorEmptyField
    }

    if(lastname.trim() === ''){
        errors.lastname = errorEmptyField
    }

    if(email.trim() === ''){
        errors.email = errorEmptyField
    } else {
        if (validator.isEmail(email) === false) {
            errors.email = errorInvalidEmail
        }
    }

    if(password === '') {
        errors.password = errorEmptyField
    } 

    if(confirmPassword === '') {
        errors.confirmPassword = errorEmptyField
    } else {
        if(password !== confirmPassword) {
            errors.confirmPassword = errorPasswordMismatch
        }
    }

    return errors
}

const loginInputValidator = (email, password) => {

    const errors = {}

    if(email.trim() === ''){
        errors.email = errorEmptyField
    } else {
        if (validator.isEmail(email) === false) {
            errors.email = errorInvalidEmail
        }
    }

    if(password === '') {
        errors.password = errorEmptyField
    }

    return errors
}

// different way of exporting, and can notice a different text color when importing to other files
module.exports = { regInputValidator, loginInputValidator }