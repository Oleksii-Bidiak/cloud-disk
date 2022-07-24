const { check } = require('express-validator')

const validatorReg = [
   check('email', 'Uncorrect email').isEmail(),
   check('password', 'Password must be longer than 6 and shorter than 24').isLength({ min: 6, max: 24 })
]

module.exports = validatorReg