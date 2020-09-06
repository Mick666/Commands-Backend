
//Controllers/Blogs.js
const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response, next) => {
    let blogs = await Blog
      .find({}).populate('user', 'username name id')
    response.json(blogs)
})

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
    
    blog
    .save()
    .then(result => {
        response.status(201).json(result)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
})

blogsRouter.put('/:id', async (request, response) => {
    const blog = new Blog(request.body)
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter

//Controllers/Users.js

const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', 'url title author id')
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.password.length < 3) {
      response.status(400).json({
          error: 'Password too short'
      })
      return
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
