//Controller/Blog.js
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blogs')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
    let blogs = await Blog
      .find({}).populate('user', 'username name id')
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
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

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
})

blogsRouter.put('/:id', async (request, response) => {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter

//Utils/Middleware.js

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

module.exports = {
    tokenExtractor,
}

