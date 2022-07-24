const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const cors = require('cors')

const PORT = config.get('port');

const app = express()
app.use(fileUpload({}))
app.use(cors())
app.use(express.json())
// app.use(express.static('static'))
app.use('/api', router)

const start = async () => {
   try {
      await mongoose.connect(config.get('dbUrl'))

      app.listen(PORT, () => {
         console.log('Server started on port ', PORT)
      })
   } catch (e) {
      console.log(e)
   }
}

start()