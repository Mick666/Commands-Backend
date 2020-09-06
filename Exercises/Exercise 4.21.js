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
    console.log(request.token)
    if (request.token === null) return response.status(401).json({error: 'Invalid token'})
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const blog = await Blog.findById(request.params.id);
    console.log(blog.user)
    console.log(decodedToken.id.toString())
    if (blog.user.toString() === decodedToken.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        return response.status(204).end();
    } 
    return response.status(401).json({error: 'Invalid token'})
    
})

blogsRouter.put('/:id', async (request, response) => {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
