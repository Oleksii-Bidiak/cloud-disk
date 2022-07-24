const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const validatorReg = require('../validations/validatorReg')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', validatorReg, userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router