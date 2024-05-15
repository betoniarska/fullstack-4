const http = require('http')

const express = require('express')
const app = express()
const cors = require('cors')


const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const Blog = require('./models/blog')

const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')


mongoose.set('strictQuery', false)

const url = config.MONGODB_URI

logger.info('connecting to', url)
mongoose.connect(url)

  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)




module.exports = app