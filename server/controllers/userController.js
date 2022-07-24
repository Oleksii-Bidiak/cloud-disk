const User = require('../models/User')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const fileService = require('../services/fileService')
const File = require('../models/File')

class UserController {
   async registration(req, res) {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Uncorrect request", errors })
         }
         const { email, password } = req.body
         const candidate = await User.findOne({ email })
         if (candidate) {
            return res.status(400).json({ message: `User with email ${email} already exist` })
         }
         const hashPassword = await bcrypt.hash(password, 8)
         const user = new User({ email, password: hashPassword })
         await user.save()
         await fileService.createDir(new File({ user: user._id, name: '' }))
         res.json({ message: "User was created" })
      } catch (e) {
         console.log(e)
         res.send({ message: "Server error" })
      }
   }

   async login(req, res) {
      try {

         const { email, password } = req.body
         const user = await User.findOne({ email })

         if (!user) {
            return res.status(400).json({ message: "User not found" })
         }

         const isPasswordValid = bcrypt.compareSync(password, user.password)
         if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" })
         }

         const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: '1h' })

         return res.json({
            token,
            user: {
               id: user.id,
               email: user.email,
               diskSpace: user.diskSpace,
               usedSpace: user.usedSpace,
               avatar: user.avatar
            }
         })

      } catch (e) {
         console.log(e)
         res.send({ message: "Server error" })
      }
   }

   async check(req, res) {
      try {
         const user = await User.findOne({ _id: req.user.id })

         const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: '1h' })

         return res.json({
            token,
            user: {
               id: user.id,
               email: user.email,
               diskSpace: user.diskSpace,
               usedSpace: user.usedSpace,
               avatar: user.avatar
            }
         })
      } catch (e) {
         console.log(e)
         res.send({ message: "Server error" })
      }
   }
}

module.exports = new UserController()