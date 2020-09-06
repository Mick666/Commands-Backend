const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blogs')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())


app.get('/api/blogs', async (request, response, next) => {
  let blogs = await Blog
    .find({}).populate('user', 'username name id')
  response.json(blogs)
})

app.post('/api/blogs', async (request, response, next) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: !body.likes ? 0 : body.likes,
      user: user._id
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = app